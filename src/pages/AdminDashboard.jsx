import React, { useState, useEffect } from 'react';
import {
  Lock,
  Package,
  UploadCloud,
  FileText,
  Mail,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle,
  Eye,
  RefreshCw,
  Copy,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import Button from '../components/Button';
import Modal from '../components/Modal';
import '../styles/admin.css';

export default function AdminDashboard() {
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'uploads' | 'inquiries' | 'settings'
  const [packages, setPackages] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState({
    instagramUrl: '',
    contactEmail: '',
    contactPhone: '',
    agencyName: '',
  });

  const [loadingData, setLoadingData] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Package Modal (Create / Edit)
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageFormData, setPackageFormData] = useState({
    name: '',
    category: 'Website Design & Development',
    badge: '',
    description: '',
    priceType: 'fixed',
    price: '$299',
    customPriceLabel: 'Contact for pricing',
    billingPeriod: 'one-time',
    features: ['Custom responsive design', 'Fast page loading'],
    brochureUrl: '',
    imageUrl: '',
    isActive: true,
  });
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [savingPackage, setSavingPackage] = useState(false);

  // Upload state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgressMsg, setUploadProgressMsg] = useState(null);

  // Settings form
  const [savingSettings, setSavingSettings] = useState(false);

  // Load admin data when authenticated
  const loadDashboardData = async () => {
    try {
      setLoadingData(true);
      const [pkgs, uplds, inqs, sttngs] = await Promise.all([
        api.adminGetPackages().catch(() => []),
        api.adminGetUploads().catch(() => []),
        api.adminGetInquiries().catch(() => []),
        api.getSettings().catch(() => ({})),
      ]);
      setPackages(pkgs);
      setUploads(uplds);
      setInquiries(inqs);
      setSettings((prev) => ({ ...prev, ...sttngs }));
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    if (!passwordInput.trim()) {
      setLoginError('Please enter the administrator password.');
      return;
    }
    try {
      setLoggingIn(true);
      await login(passwordInput);
      setPasswordInput('');
    } catch (err) {
      setLoginError(err.message || 'Invalid administrator password.');
    } finally {
      setLoggingIn(false);
    }
  };

  // Clear messages after 5 seconds
  const notifySuccess = (msg) => {
    setActionSuccess(msg);
    setActionError(null);
    setTimeout(() => setActionSuccess(null), 5000);
  };

  const notifyError = (msg) => {
    setActionError(msg);
    setActionSuccess(null);
    setTimeout(() => setActionError(null), 6000);
  };

  // Package Management Handlers
  const openCreatePackageModal = () => {
    setEditingPackageId(null);
    setPackageFormData({
      name: '',
      category: 'Website Design & Development',
      badge: '',
      description: '',
      priceType: 'fixed',
      price: '$299',
      customPriceLabel: 'Contact for pricing',
      billingPeriod: 'one-time',
      features: ['Custom responsive design', 'Fast page loading'],
      brochureUrl: '',
      imageUrl: '',
      isActive: true,
    });
    setNewFeatureInput('');
    setIsPackageModalOpen(true);
  };

  const openEditPackageModal = (pkg) => {
    setEditingPackageId(pkg.id);
    setPackageFormData({
      name: pkg.name || '',
      category: pkg.category || 'Website Design & Development',
      badge: pkg.badge || '',
      description: pkg.description || '',
      priceType: pkg.priceType || 'fixed',
      price: pkg.price || '',
      customPriceLabel: pkg.customPriceLabel || 'Contact for pricing',
      billingPeriod: pkg.billingPeriod || '',
      features: Array.isArray(pkg.features) ? [...pkg.features] : [],
      brochureUrl: pkg.brochureUrl || '',
      imageUrl: pkg.imageUrl || '',
      isActive: Boolean(pkg.isActive),
    });
    setNewFeatureInput('');
    setIsPackageModalOpen(true);
  };

  const handleAddFeature = () => {
    if (!newFeatureInput.trim()) return;
    setPackageFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeatureInput.trim()],
    }));
    setNewFeatureInput('');
  };

  const handleRemoveFeature = (idx) => {
    setPackageFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }));
  };

  const handleSavePackage = async (e) => {
    e.preventDefault();
    if (!packageFormData.name.trim()) {
      notifyError('Package name is required.');
      return;
    }
    if (!packageFormData.category.trim()) {
      notifyError('Package category is required.');
      return;
    }

    try {
      setSavingPackage(true);
      if (editingPackageId) {
        await api.adminUpdatePackage(editingPackageId, packageFormData);
        notifySuccess('Package updated successfully.');
      } else {
        await api.adminCreatePackage(packageFormData);
        notifySuccess('New package created successfully.');
      }
      setIsPackageModalOpen(false);
      loadDashboardData();
    } catch (err) {
      notifyError(err.message || 'Failed to save package.');
    } finally {
      setSavingPackage(false);
    }
  };

  const handleDeletePackage = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the package "${name}"?`)) {
      return;
    }
    try {
      await api.adminDeletePackage(id);
      notifySuccess(`Package "${name}" deleted.`);
      loadDashboardData();
    } catch (err) {
      notifyError(err.message || 'Failed to delete package.');
    }
  };

  const handleTogglePackageStatus = async (pkg) => {
    try {
      await api.adminUpdatePackage(pkg.id, { isActive: !pkg.isActive });
      notifySuccess(
        `Package "${pkg.name}" is now ${!pkg.isActive ? 'Active (Public)' : 'Inactive (Draft)'}.`
      );
      loadDashboardData();
    } catch (err) {
      notifyError(err.message || 'Failed to update package status.');
    }
  };

  // Upload Management Handlers
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      notifyError('Please select a file to upload.');
      return;
    }

    try {
      setUploading(true);
      setUploadProgressMsg('Uploading and verifying file...');
      const res = await api.adminUploadFile(uploadFile);
      notifySuccess(`File "${res.file.originalName}" uploaded successfully.`);
      setUploadFile(null);
      // Reset input element
      const fileInput = document.getElementById('admin-file-input');
      if (fileInput) fileInput.value = '';
      loadDashboardData();
    } catch (err) {
      notifyError(err.message || 'Upload failed. Ensure file is PDF, JPG, PNG, or WEBP under 10MB.');
    } finally {
      setUploading(false);
      setUploadProgressMsg(null);
    }
  };

  const handleDeleteUpload = async (filename) => {
    if (!window.confirm(`Are you sure you want to delete "${filename}"?`)) {
      return;
    }
    try {
      await api.adminDeleteUpload(filename);
      notifySuccess(`File "${filename}" removed.`);
      loadDashboardData();
    } catch (err) {
      notifyError(err.message || 'Failed to delete file.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess('URL copied to clipboard!');
  };

  // Inquiries Handler
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry record?')) return;
    try {
      await api.adminDeleteInquiry(id);
      notifySuccess('Inquiry deleted.');
      loadDashboardData();
    } catch (err) {
      notifyError('Failed to remove inquiry.');
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      await api.adminUpdateSettings(settings);
      notifySuccess('Site settings updated successfully.');
    } catch (err) {
      notifyError(err.message || 'Failed to update settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  // If initial auth check is loading
  if (authLoading) {
    return (
      <div className="admin-container container" style={{ textAlign: 'center', paddingTop: '10rem' }}>
        <RefreshCw size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent-primary)' }} />
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Verifying administrator session...</p>
      </div>
    );
  }

  // If NOT authenticated, show clean Login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-container container">
        <div className="admin-login-wrap">
          <div className="admin-login-header">
            <div className="admin-lock-icon">
              <Lock size={26} />
            </div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Internal Admin Portal</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Authorized internal team access for TC Web & Studio
            </p>
          </div>

          {loginError && (
            <div className="alert alert-error animate-fade-in">
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">
                Administrator Password
              </label>
              <input
                id="admin-password"
                type="password"
                className="form-input"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loggingIn}
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div
            style={{
              marginTop: '1.75rem',
              textAlign: 'center',
              fontSize: '0.8rem',
              color: 'var(--text-faint)',
            }}
          >
            Secured session authentication. All actions are logged.
          </div>
        </div>
      </div>
    );
  }

  // Stats calculation
  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.isActive).length;
  const totalUploads = uploads.length;
  const totalInquiries = inquiries.length;

  return (
    <div className="admin-container container">
      {/* Admin Top Header */}
      <div className="admin-top-bar">
        <div className="admin-profile">
          <div className="admin-avatar">TC</div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>TC Web & Studio Admin</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)' }}>
              ● Session Authenticated
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={loadDashboardData}
            title="Refresh dashboard data"
          >
            <RefreshCw size={14} className={loadingData ? 'spin' : ''} /> Refresh
          </Button>
          <Button variant="danger" size="sm" onClick={logout} icon={LogOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Global Alerts */}
      {actionSuccess && (
        <div className="alert alert-success animate-fade-in">
          <CheckCircle size={18} style={{ flexShrink: 0 }} />
          <span>{actionSuccess}</span>
        </div>
      )}
      {actionError && (
        <div className="alert alert-error animate-fade-in">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{actionError}</span>
        </div>
      )}

      {/* Stats Cards Bar */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-val">{activePackages}</div>
            <div className="admin-stat-label">Active Public Packages</div>
          </div>
          <Package size={28} style={{ color: 'var(--accent-primary)' }} />
        </div>
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-val">{totalPackages}</div>
            <div className="admin-stat-label">Total Packages in Catalog</div>
          </div>
          <FileText size={28} style={{ color: 'var(--accent-indigo)' }} />
        </div>
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-val">{totalUploads}</div>
            <div className="admin-stat-label">Uploaded Brochures & Media</div>
          </div>
          <UploadCloud size={28} style={{ color: '#ec4899' }} />
        </div>
        <div className="admin-stat-card">
          <div>
            <div className="admin-stat-val">{totalInquiries}</div>
            <div className="admin-stat-label">Client Inquiries Received</div>
          </div>
          <Mail size={28} style={{ color: 'var(--accent-emerald)' }} />
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="admin-tabs">
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
          onClick={() => setActiveTab('packages')}
        >
          <Package size={16} /> Service Packages ({totalPackages})
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'uploads' ? 'active' : ''}`}
          onClick={() => setActiveTab('uploads')}
        >
          <UploadCloud size={16} /> PDF & Media Uploads ({totalUploads})
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          <Mail size={16} /> Client Inquiries ({totalInquiries})
        </button>
        <button
          type="button"
          className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} /> Site & Instagram Settings
        </button>
      </div>

      {/* TAB 1: PACKAGES MANAGEMENT */}
      {activeTab === 'packages' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Service Packages Management</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Create, edit, toggle visibility, and attach PDF brochures to client packages.
              </p>
            </div>
            <Button variant="primary" size="sm" icon={Plus} onClick={openCreatePackageModal}>
              Create New Package
            </Button>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Package Name</th>
                  <th>Category</th>
                  <th>Pricing</th>
                  <th>Features</th>
                  <th>Brochure (PDF)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No packages found. Click "Create New Package" to add your first package.
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td>
                        <strong>{pkg.name}</strong>
                        {pkg.badge && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>
                            [{pkg.badge}]
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          {pkg.category}
                        </span>
                      </td>
                      <td>
                        {pkg.priceType === 'custom' ? (
                          <span style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>
                            {pkg.customPriceLabel || 'Contact for pricing'}
                          </span>
                        ) : (
                          <div>
                            <strong>{pkg.price}</strong>
                            {pkg.billingPeriod && (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                                {' '}/ {pkg.billingPeriod}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.85rem' }}>
                          {pkg.features ? `${pkg.features.length} deliverables` : 'None'}
                        </span>
                      </td>
                      <td>
                        {pkg.brochureUrl ? (
                          <a
                            href={pkg.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              color: '#fb7185',
                              fontSize: '0.85rem',
                            }}
                          >
                            <FileText size={14} /> PDF <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-faint)', fontSize: '0.85rem' }}>
                            None attached
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleTogglePackageStatus(pkg)}
                          className={`badge ${pkg.isActive ? 'badge-emerald' : 'badge-danger'}`}
                          style={{
                            cursor: 'pointer',
                            border: 'none',
                            background: pkg.isActive
                              ? 'rgba(16, 185, 129, 0.2)'
                              : 'rgba(244, 63, 94, 0.2)',
                            color: pkg.isActive ? '#6ee7b7' : '#fda4af',
                            padding: '0.35rem 0.75rem',
                          }}
                        >
                          {pkg.isActive ? 'Active (Live)' : 'Draft (Hidden)'}
                        </button>
                      </td>
                      <td>
                        <div className="action-btns">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditPackageModal(pkg)}
                            title="Edit Package"
                          >
                            <Edit3 size={14} />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                            title="Delete Package"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOADS & BROCHURES */}
      {activeTab === 'uploads' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>PDF Brochures & Media Uploads</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Upload PDF service brochures, presentation decks, or images (JPG, PNG, WEBP).
                Maximum size 10MB.
              </p>
            </div>
          </div>

          {/* Upload Form Box */}
          <form
            onSubmit={handleUploadSubmit}
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem',
              marginBottom: '2rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                id="admin-file-input"
                type="file"
                accept=".pdf,image/jpeg,image/png,image/webp"
                onChange={(e) => setUploadFile(e.target.files[0] || null)}
                style={{
                  color: 'var(--text-main)',
                  padding: '0.5rem',
                  fontSize: '0.9rem',
                }}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={uploading}
                icon={UploadCloud}
                disabled={!uploadFile}
              >
                Upload Document
              </Button>
            </div>
            {uploadProgressMsg && (
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', marginTop: '0.5rem' }}>
                {uploadProgressMsg}
              </div>
            )}
            <div className="form-hint" style={{ marginTop: '0.75rem' }}>
              Supported formats: PDF (Recommended for package brochures), JPG, PNG, WEBP.
            </div>
          </form>

          {/* Uploaded Files Table */}
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Uploaded Date</th>
                  <th>Public URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploads.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No uploaded files yet. Use the upload field above to upload a PDF brochure.
                    </td>
                  </tr>
                ) : (
                  uploads.map((file) => (
                    <tr key={file.filename}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          {file.isPdf ? (
                            <FileText size={20} style={{ color: '#fb7185' }} />
                          ) : (
                            <Eye size={20} style={{ color: 'var(--accent-primary)' }} />
                          )}
                          <div>
                            <strong style={{ fontSize: '0.9rem' }}>{file.filename}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-cyan">
                          {file.isPdf ? 'PDF Document' : 'Image'}
                        </span>
                      </td>
                      <td>{(file.size / 1024).toFixed(1)} KB</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(file.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                          onClick={() => copyToClipboard(file.url)}
                          title="Copy file URL"
                        >
                          <Copy size={12} /> {file.url.substring(0, 24)}...
                        </button>
                      </td>
                      <td>
                        <div className="action-btns">
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline btn-sm"
                            title="Preview file"
                          >
                            <ExternalLink size={14} />
                          </a>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteUpload(file.filename)}
                            title="Delete File"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT INQUIRIES */}
      {activeTab === 'inquiries' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Client Inquiries Log</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Review incoming project messages and requests submitted through the contact page.
              </p>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service of Interest</th>
                  <th>Message</th>
                  <th>Received At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                      No client inquiries recorded yet. Messages submitted via the contact form will appear here.
                    </td>
                  </tr>
                ) : (
                  inquiries.map((inq) => (
                    <tr key={inq.id}>
                      <td>
                        <strong>{inq.name}</strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
                          <a href={`mailto:${inq.email}`}>{inq.email}</a>
                        </div>
                        {inq.phone && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            {inq.phone}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className="badge badge-indigo">{inq.serviceInterest}</span>
                      </td>
                      <td style={{ maxWidth: '380px', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {inq.message}
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>
                        {new Date(inq.receivedAt).toLocaleString()}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          title="Delete inquiry"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & INSTAGRAM */}
      {activeTab === 'settings' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <div>
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Site Settings & Social Links</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Configure the official Instagram URL and public contact channels without touching code.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} style={{ maxWidth: '650px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="setting-instagram">
                Official Instagram Profile URL
              </label>
              <input
                id="setting-instagram"
                type="url"
                className="form-input"
                placeholder="e.g. https://www.instagram.com/tcwebstudio"
                value={settings.instagramUrl || ''}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, instagramUrl: e.target.value }))
                }
              />
              <div className="form-hint">
                Note: Leave this empty to display <strong>"Instagram link coming soon"</strong> on the website.
                When the official Instagram profile is ready, paste the URL here to activate the live link.
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="setting-email">
                Contact Email Address
              </label>
              <input
                id="setting-email"
                type="email"
                className="form-input"
                placeholder="contact@tcwebstudio.com"
                value={settings.contactEmail || ''}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="setting-phone">
                Contact Phone / WhatsApp
              </label>
              <input
                id="setting-phone"
                type="text"
                className="form-input"
                placeholder="+91 98765 43210"
                value={settings.contactPhone || ''}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))
                }
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={savingSettings}
              style={{ marginTop: '1rem' }}
            >
              Save Site Settings
            </Button>
          </form>
        </div>
      )}

      {/* Package Creation / Edit Modal */}
      <Modal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        title={editingPackageId ? 'Edit Service Package' : 'Create New Service Package'}
      >
        <form onSubmit={handleSavePackage}>
          <div className="form-group">
            <label className="form-label">Package Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Starter Web Presence"
              value={packageFormData.name}
              onChange={(e) =>
                setPackageFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Service Category *</label>
              <select
                className="form-select"
                value={packageFormData.category}
                onChange={(e) =>
                  setPackageFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="Website Design & Development">Website Design & Development</option>
                <option value="Social Media & Instagram Management">Social Media & Instagram Management</option>
                <option value="Video Editing & Creative Content">Video Editing & Creative Content</option>
                <option value="Full Creative & Digital Suite">Full Creative & Digital Suite</option>
                <option value="Branding & Identity">Branding & Identity</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Badge Tag (Optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Popular for Startups"
                value={packageFormData.badge}
                onChange={(e) =>
                  setPackageFormData((prev) => ({ ...prev, badge: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Short Description</label>
            <textarea
              className="form-textarea"
              rows={2}
              placeholder="Brief summary of who this package is for..."
              value={packageFormData.description}
              onChange={(e) =>
                setPackageFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          {/* Pricing Controls */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.25rem',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label className="form-label">Pricing Type</label>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="priceType"
                    value="fixed"
                    checked={packageFormData.priceType === 'fixed'}
                    onChange={() =>
                      setPackageFormData((prev) => ({ ...prev, priceType: 'fixed' }))
                    }
                  />
                  <span>Fixed Price (e.g. $299)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="priceType"
                    value="custom"
                    checked={packageFormData.priceType === 'custom'}
                    onChange={() =>
                      setPackageFormData((prev) => ({ ...prev, priceType: 'custom' }))
                    }
                  />
                  <span>Custom "Contact for pricing"</span>
                </label>
              </div>
            </div>

            {packageFormData.priceType === 'fixed' ? (
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Price Display</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. $299 or ₹14,999"
                    value={packageFormData.price}
                    onChange={(e) =>
                      setPackageFormData((prev) => ({ ...prev, price: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Billing Period</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. one-time or per month"
                    value={packageFormData.billingPeriod}
                    onChange={(e) =>
                      setPackageFormData((prev) => ({
                        ...prev,
                        billingPeriod: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            ) : (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Custom Label</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Contact for pricing"
                  value={packageFormData.customPriceLabel}
                  onChange={(e) =>
                    setPackageFormData((prev) => ({
                      ...prev,
                      customPriceLabel: e.target.value,
                    }))
                  }
                />
              </div>
            )}
          </div>

          {/* Features Checklist Builder */}
          <div className="form-group">
            <label className="form-label">Deliverable Features Checklist</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Type a feature (e.g. '5 Responsive Pages')..."
                value={newFeatureInput}
                onChange={(e) => setNewFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <Button type="button" variant="outline" size="sm" onClick={handleAddFeature}>
                Add
              </Button>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {packageFormData.features.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.45rem 0.75rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Check size={14} style={{ color: 'var(--accent-emerald)' }} />
                    {item}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent-rose)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Brochure Selector */}
          <div className="form-group">
            <label className="form-label">Attach PDF Brochure URL</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. /uploads/tc_services_brochure.pdf"
                value={packageFormData.brochureUrl}
                onChange={(e) =>
                  setPackageFormData((prev) => ({ ...prev, brochureUrl: e.target.value }))
                }
              />
              {uploads.length > 0 && (
                <select
                  className="form-select"
                  style={{ width: 'auto', minWidth: '160px' }}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPackageFormData((prev) => ({
                        ...prev,
                        brochureUrl: e.target.value,
                      }));
                    }
                  }}
                  value=""
                >
                  <option value="">Pick from uploads...</option>
                  {uploads
                    .filter((u) => u.isPdf)
                    .map((pdf) => (
                      <option key={pdf.filename} value={pdf.url}>
                        {pdf.filename}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <div className="form-hint">
              When attached, a "View PDF Brochure" button will appear on the public package card.
            </div>
          </div>

          {/* Status Active Toggle */}
          <div className="form-group" style={{ marginTop: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={packageFormData.isActive}
                onChange={(e) =>
                  setPackageFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                }
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontWeight: 600 }}>Active (Visible on public packages page)</span>
            </label>
          </div>

          {/* Submit buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPackageModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={savingPackage}
            >
              {editingPackageId ? 'Update Package' : 'Create Package'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
