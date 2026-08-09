import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('[db] MONGODB_URI is not set. Set it in your environment (.env / Vercel project settings).');
}

// Cache the connection across serverless function invocations (important on Vercel)
let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null, error: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to your environment (.env locally, or Vercel Project Settings -> Environment Variables).');
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        // Don't leave a rejected promise cached -- otherwise every request
        // on this warm instance fails forever, even after a transient
        // network blip or a mid-flight env var fix.
        cached.promise = null;
        cached.error = err;
        throw err;
      });
  }
  cached.conn = await cached.promise;
  cached.error = null;
  return cached.conn;
}

export function getDatabaseReadFallback(rules) {
  const unavailable = !MONGODB_URI || !cached.conn || Boolean(cached.error);
  if (!unavailable) {
    return { status: null, payload: null };
  }

  if (rules?.publicRead) {
    return { status: 200, payload: [] };
  }

  return { status: 503, payload: { error: 'Database unavailable' } };
}

export default connectDB;
