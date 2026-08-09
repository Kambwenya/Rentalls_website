import test from 'node:test';
import assert from 'node:assert/strict';
import { getDatabaseReadFallback } from '../src/lib/db.js';

test('public entity reads fall back to an empty list when the database is unavailable', () => {
  const result = getDatabaseReadFallback({ publicRead: true });

  assert.deepEqual(result, { status: 200, payload: [] });
});

test('non-public entity reads return a 503 when the database is unavailable', () => {
  const result = getDatabaseReadFallback({ publicRead: false });

  assert.deepEqual(result, { status: 503, payload: { error: 'Database unavailable' } });
});
