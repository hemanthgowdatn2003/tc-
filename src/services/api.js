const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const defaultHeaders = {};
  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Public
  async getPackages() {
    const res = await request('/packages');
    return res.packages || [];
  },

  async getPackageById(id) {
    const res = await request(`/packages/${id}`);
    return res.package;
  },

  async getSettings() {
    const res = await request('/settings');
    return res.settings;
  },

  async submitContact(formData) {
    return await request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },

  // Admin Auth
  async adminCheckSession() {
    const res = await request('/admin/session');
    return res.authenticated === true;
  },

  async adminLogin(password) {
    return await request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  async adminLogout() {
    return await request('/admin/logout', {
      method: 'POST',
    });
  },

  // Admin Package CRUD
  async adminGetPackages() {
    const res = await request('/admin/packages');
    return res.packages || [];
  },

  async adminCreatePackage(pkgData) {
    return await request('/admin/packages', {
      method: 'POST',
      body: JSON.stringify(pkgData),
    });
  },

  async adminUpdatePackage(id, pkgData) {
    return await request(`/admin/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pkgData),
    });
  },

  async adminDeletePackage(id) {
    return await request(`/admin/packages/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin Uploads
  async adminGetUploads() {
    const res = await request('/admin/uploads');
    return res.files || [];
  },

  async adminUploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await request('/admin/upload', {
      method: 'POST',
      body: formData,
    });
  },

  async adminDeleteUpload(filename) {
    return await request(`/admin/uploads/${encodeURIComponent(filename)}`, {
      method: 'DELETE',
    });
  },

  // Admin Inquiries & Settings
  async adminGetInquiries() {
    const res = await request('/admin/inquiries');
    return res.inquiries || [];
  },

  async adminDeleteInquiry(id) {
    return await request(`/admin/inquiries/${id}`, {
      method: 'DELETE',
    });
  },

  async adminUpdateSettings(settingsData) {
    return await request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData),
    });
  },
};
