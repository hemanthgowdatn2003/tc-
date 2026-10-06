import { describe, it } from 'node:test';
import assert from 'node:assert';

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';

describe('TC Web & Studio API Tests', () => {
  let sessionCookie = '';
  let createdPackageId = '';

  it('GET /api/health returns status ok', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
  });

  it('GET /api/packages returns active packages list', async () => {
    const res = await fetch(`${BASE_URL}/api/packages`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.packages));
    assert.ok(data.packages.length > 0);
  });

  it('GET /api/admin/packages rejects unauthenticated request with 401', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/packages`);
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  it('POST /api/admin/login fails with wrong password', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'wrongpassword' }),
    });
    assert.strictEqual(res.status, 401);
  });

  it('POST /api/admin/login succeeds with correct password', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'tcadmin2026!' }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    const rawCookie = res.headers.get('set-cookie');
    assert.ok(rawCookie, 'Expected session cookie to be set');
    sessionCookie = rawCookie.split(';')[0];
  });

  it('GET /api/admin/session validates authenticated session', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/session`, {
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.authenticated, true);
  });

  it('POST /api/admin/packages creates a new package', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/packages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie,
      },
      body: JSON.stringify({
        name: 'Automated Test Package',
        category: 'Website Design & Development',
        priceType: 'fixed',
        price: '$199',
        features: ['Feature 1', 'Feature 2'],
        isActive: true,
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.package.id);
    createdPackageId = data.package.id;
  });

  it('PUT /api/admin/packages/:id updates an existing package', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/packages/${createdPackageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie,
      },
      body: JSON.stringify({
        name: 'Automated Test Package Updated',
        price: '$249',
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.package.name, 'Automated Test Package Updated');
  });

  it('DELETE /api/admin/packages/:id removes the package', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/packages/${createdPackageId}`, {
      method: 'DELETE',
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  it('POST /api/contact validates missing fields', async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'invalid', message: '' }),
    });
    assert.strictEqual(res.status, 400);
  });

  it('POST /api/contact succeeds with valid fields', async () => {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 555-0199',
        serviceInterest: 'Website Design & Development',
        message: 'Hello TC Web & Studio! We need a modern landing page designed.',
      }),
    });
    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.inquiryId);
  });

  it('POST /api/admin/logout terminates admin session', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/logout`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });
});
