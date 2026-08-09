# Vercel production setup for the backend

Use this file as the exact checklist for the backend project in Vercel.

## 1) Vercel project settings

Create one Vercel project for the backend with these settings:

- Project name: `rentalls-backend` (or your own preferred name)
- Root Directory: `backend`
- Framework Preset: `Other` (this project uses a custom Express app via `api/index.js`)
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: `npm install`
- Node.js Version: `20.x` (or `18.x` if that is what your Vercel account defaults to)

## 2) Required environment variables

Add these in Vercel Project Settings -> Environment Variables.

### Required

- `MONGODB_URI`
  - Value: `mongodb+srv://murithichambers_db_user:67wW9vGBS9SIMHM7@rentalls.kai3wfl.mongodb.net`
  - This points to your production MongoDB Atlas database.

- `JWT_SECRET`
  - Example: `ab3d134c0e45963270bd410df6b3c1c887d6731c794ff23c696e20ce24952e49`
  - This value is already generated for you, but you can replace it with your own long random string.

- `JWT_EXPIRES_IN`
  - Value: `30d`

- `APP_URL`
  - Value: `https://rentalls-website.vercel.app`
  - This is the public URL of your frontend deployment.

- `CORS_ORIGIN`
  - Value: `https://rentalls-website.vercel.app`
  - If you use multiple frontend domains, separate them with commas.

### Optional but recommended

- `GOOGLE_CLIENT_ID`
  - Example: `1234567890-abc123def456.apps.googleusercontent.com`
  - Leave blank if Google sign-in should be disabled.

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
  - Leave blank if you want emails to log to the server console during development or early production testing.

### Seed/admin values (only needed for first-time setup)

- `ADMIN_EMAIL`
  - Example: `admin@rentalls.com`
- `ADMIN_PASSWORD`
  - Example: `ChangeMe123!`

These are only used by the seed script and are not required for normal runtime.

## 3) Frontend pairing values

The frontend project should also be configured with these values:

- `VITE_API_URL` = `https://<your-backend-vercel-domain>.vercel.app`
- `VITE_GOOGLE_CLIENT_ID` = the same value as `GOOGLE_CLIENT_ID`

## 4) Deployment flow

1. Deploy the backend project from the `backend` directory.
2. Copy the deployed backend URL.
3. Set that URL in the frontend `VITE_API_URL` environment variable.
4. Redeploy the frontend.
5. Run the seed command once against the production database if you need the first admin user:

```bash
ADMIN_EMAIL=admin@rentalls.com ADMIN_PASSWORD=ChangeMe123! npm run seed
```
