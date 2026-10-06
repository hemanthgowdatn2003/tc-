import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
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
      ? `Hi TC Web & Studio team, I am interested in getting started with the "${prefilledPackage}" package. Here are some details about my project:`
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
      errors.serviceInterest = 'Please select a service of interest.';
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
          'Thank you for reaching out! Your inquiry has been received by TC Web & Studio. Our team will review your project details and get back to you within 24-48 business hours.'
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
        err.message || 'Unable to submit your message right now. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim());

  return (
    <div className="contact-page" style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Mail size={14} /> Get in Touch
          </span>
          <h1 className="section-title">
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h1>
          <p className="section-description">
            Tell us about your project, your brand goals, or the specific service package you
            are interested in. Our team responds within 24-48 business hours.
          </p>
        </div>

        <div className="contact-layout">
          {/* Left Panel: Direct Channels & Instagram */}
          <div className="contact-info-panel">
            <div className="contact-card">
              <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem' }}>
                Direct Communication
              </h3>

              {settings.contactEmail && (
                <div className="contact-item">
                  <div className="contact-item-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="contact-item-label">Email Us</div>
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
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="contact-item-label">Call or WhatsApp</div>
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
                  <Clock size={20} />
                </div>
                <div>
                  <div className="contact-item-label">Working Hours</div>
                  <div className="contact-item-val" style={{ fontSize: '0.95rem' }}>
                    Monday – Saturday: 9:30 AM – 7:00 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Section */}
            <div className="contact-instagram-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <InstagramIcon size={20} style={{ color: '#f43f5e' }} />
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Instagram Presence</h4>
              </div>
              <p
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem',
                }}
              >
                We produce creative visual reels, showcase behind-the-scenes work, and
                provide insights on digital design and social growth.
              </p>

              {hasInstagram ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'inline-flex', gap: '0.5rem' }}
                >
                  <InstagramIcon size={16} /> Open Instagram Profile <ExternalLink size={14} />
                </a>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.55rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px dashed rgba(255, 255, 255, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.875rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <InstagramIcon size={16} style={{ color: '#f43f5e' }} />
                  <span>Instagram link coming soon</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Interactive Contact Form */}
          <div className="contact-form-panel">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Send Us a Message</h3>
            <p
              style={{
                fontSize: '0.925rem',
                color: 'var(--text-muted)',
                marginBottom: '1.75rem',
              }}
            >
              Fill out the form below with your requirements and we will review your request promptly.
            </p>

            {/* Success Banner */}
            {successMessage && (
              <div className="alert alert-success animate-fade-in">
                <CheckCircle size={20} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Inquiry Received!</strong>
                  <p style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: '#6ee7b7' }}>
                    {successMessage}
                  </p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="alert alert-error animate-fade-in">
                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {fieldErrors.name && (
                    <div className="form-error">{fieldErrors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="e.g. john@business.com"
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
                    Phone Number (Optional)
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-service">
                    Service of Interest *
                  </label>
                  <select
                    id="contact-service"
                    name="serviceInterest"
                    className="form-select"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                  >
                    <option value="Website Design & Development">
                      Website Design & Development
                    </option>
                    <option value="Social Media & Instagram Management">
                      Social Media Management
                    </option>
                    <option value="Instagram Account Management">
                      Instagram Account Management
                    </option>
                    <option value="Video Editing & Creative Content">
                      Video Editing & Creative Content
                    </option>
                    <option value="Branding & Digital Creative Services">
                      Branding & Digital Creative Services
                    </option>
                    <option value="Starter Web Presence">
                      Package: Starter Web Presence
                    </option>
                    <option value="Social & Instagram Growth">
                      Package: Social & Instagram Growth
                    </option>
                    <option value="Video & Reel Production Pack">
                      Package: Video & Reel Production Pack
                    </option>
                    <option value="Complete Studio Retainer">
                      Package: Complete Studio Retainer
                    </option>
                    <option value="Other Custom Project">
                      Other / Custom Consultation
                    </option>
                  </select>
                  {fieldErrors.serviceInterest && (
                    <div className="form-error">{fieldErrors.serviceInterest}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Project Details / Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your brand goals, target timeline, deliverables, or questions..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
                {fieldErrors.message && (
                  <div className="form-error">{fieldErrors.message}</div>
                )}
                <div className="form-hint">
                  Please provide at least 10 characters detailing your scope or question.
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={submitting}
                style={{ width: '100%' }}
                icon={Send}
              >
                Submit Project Inquiry
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
