import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, ArrowUpRight, Shield, Heart } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { api } from '../services/api';

export default function Footer() {
  const [settings, setSettings] = useState({
    instagramUrl: '',
    contactEmail: 'contact@tcwebstudio.com',
    contactPhone: '+91 98765 43210',
  });

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

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim());

  return (
    <footer
      style={{
        background: '#070a14',
        borderTop: '1px solid var(--border-subtle)',
        padding: '5rem 0 2rem 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--gradient-brand)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0f172a',
                  fontWeight: 800,
                  fontSize: '1rem',
                }}
              >
                TC
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                }}
              >
                TC Web & Studio
              </span>
            </div>
            <p
              style={{
                fontSize: '0.925rem',
                lineHeight: 1.65,
                color: 'var(--text-muted)',
                marginBottom: '1.5rem',
              }}
            >
              Creative digital services agency delivering modern web development,
              strategic social media & Instagram management, and scroll-stopping video content.
            </p>

            {/* Instagram Link Section */}
            <div style={{ marginTop: '1rem' }}>
              {hasInstagram ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ gap: '0.5rem', borderColor: '#f43f5e', color: '#fb7185' }}
                >
                  <InstagramIcon size={16} /> Follow on Instagram
                </a>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 0.85rem',
                    background: 'rgba(244, 63, 94, 0.08)',
                    border: '1px dashed rgba(244, 63, 94, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.825rem',
                    color: '#fb7185',
                  }}
                >
                  <InstagramIcon size={14} /> Instagram link coming soon
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.25rem',
                color: 'var(--text-main)',
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <li>
                <Link to="/" style={{ color: 'var(--text-muted)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" style={{ color: 'var(--text-muted)' }}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/packages" style={{ color: 'var(--text-muted)' }}>
                  Service Packages
                </Link>
              </li>
              <li>
                <a href="/#approach" style={{ color: 'var(--text-muted)' }}>
                  Our Approach
                </a>
              </li>
              <li>
                <Link to="/team" style={{ color: 'var(--text-muted)' }}>
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-muted)' }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.25rem',
                color: 'var(--text-main)',
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.925rem',
                color: 'var(--text-muted)',
              }}
            >
              <li>Website Design & Development</li>
              <li>Social Media Management</li>
              <li>Instagram Account Management</li>
              <li>Video Editing & Creative Content</li>
              <li>Branding & Digital Creative</li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4
              style={{
                fontSize: '1.1rem',
                marginBottom: '1.25rem',
                color: 'var(--text-main)',
              }}
            >
              Get in Touch
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                fontSize: '0.925rem',
              }}
            >
              {settings.contactEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Mail size={16} style={{ color: 'var(--accent-primary)' }} />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              )}
              {settings.contactPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Phone size={16} style={{ color: 'var(--accent-primary)' }} />
                  <a
                    href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              )}
              <div style={{ marginTop: '0.5rem' }}>
                <Link
                  to="/admin"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-faint)',
                  }}
                >
                  <Shield size={13} /> Internal Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-faint)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} TC Web & Studio. All rights reserved.
          </div>
          <div>
            Crafted for speed, modern aesthetics, and measurable brand growth.
          </div>
        </div>
      </div>
    </footer>
  );
}
