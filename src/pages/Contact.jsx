import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import Button from '../components/Button';
import { api } from '../services/api';
import '../styles/contact.css';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const prefilledPackage = searchParams.get('package');
  const prefilledService = searchParams.get('service');

  const [settings, setSettings] = useState({
    instagramUrl: '',
    contactEmail: 'contact@tcwebstudio.com',
    contactPhone: '+91 98765 43210',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest:
      prefilledPackage || prefilledService || 'Website Design & Development',
    message: prefilledPackage
      ? `Interested in the "${prefilledPackage}" package.`
      : '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    let isMounted = true;
    api
      .getSettings()
      .then((data) => {
        if (isMounted && data) {
          setSettings((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.serviceInterest.trim()) {
      errors.serviceInterest = 'Please select a service.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitContact(formData);
      setSuccessMessage(
        res.message ||
          'Thank you for reaching out! We have received your inquiry and will respond within 24-48 business hours.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceInterest: 'Website Design & Development',
        message: '',
      });
      setFieldErrors({});
    } catch (err) {
      console.error('Contact submit error:', err);
      setErrorMessage(
        err.message || 'Unable to submit your message right now. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim());

  return (
    <div className="contact-page" style={{ paddingTop: '6.5rem', paddingBottom: '4.5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Contact</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-description">
            Send us a message about your project and we will reply promptly.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Panel */}
          <div className="contact-info-panel">
            <div className="contact-card">
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>
                Direct Contact
              </h3>

              {settings.contactEmail && (
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="contact-item-label">Email</div>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="contact-item-val"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>
              )}

              {settings.contactPhone && (
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-item-label">Phone</div>
                    <a
                      href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                      className="contact-item-val"
                    >
                      {settings.contactPhone}
                    </a>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="contact-item-label">Hours</div>
                  <div className="contact-item-val" style={{ fontSize: '0.9rem' }}>
                    Mon – Sat: 9:30 AM – 7:00 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Section */}
            <div className="contact-instagram-card">
              <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Instagram</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Follow our official social updates and creative work.
              </p>

              {hasInstagram ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.4rem', fontSize: '0.85rem' }}
                >
                  <InstagramIcon size={15} /> Visit Profile <ExternalLink size={13} />
                </a>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.85rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px dashed var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.825rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <InstagramIcon size={14} />
                  <span>Instagram link coming soon</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Clean Form */}
          <div className="contact-form-panel">
            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.35rem' }}>Send Message</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We review and reply to inquiries within 24-48 business hours.
            </p>

            {successMessage && (
              <div className="alert alert-success animate-fade-in">
                <CheckCircle size={18} style={{ flexShrink: 0 }} />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-error animate-fade-in">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && (
                    <div className="form-error">{fieldErrors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="name@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {fieldErrors.email && (
                    <div className="form-error">{fieldErrors.email}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">
                    Phone (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-service">
                    Service *
                  </label>
                  <select
                    id="contact-service"
                    name="serviceInterest"
                    className="form-select"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                  >
                    <option value="Website Design & Development">Website Design & Development</option>
                    <option value="Social Media & Instagram Management">Social Media Management</option>
                    <option value="Instagram Account Management">Instagram Account Management</option>
                    <option value="Video Editing & Creative Content">Video Editing & Creative Content</option>
                    <option value="Branding & Digital Creative Services">Branding & Creative</option>
                    <option value="Starter Web Presence">Package: Starter Web Presence</option>
                    <option value="Social & Instagram Growth">Package: Social & Instagram Growth</option>
                    <option value="Video & Reel Production Pack">Package: Video & Reel Production</option>
                    <option value="Complete Studio Retainer">Package: Complete Studio Retainer</option>
                    <option value="Other / Custom Project">Other Custom Project</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us briefly about your brand or questions..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
                {fieldErrors.message && (
                  <div className="form-error">{fieldErrors.message}</div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={submitting}
                style={{ width: '100%' }}
                icon={Send}
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
