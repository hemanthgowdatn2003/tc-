import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
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
        background: '#f1f5f9',
        borderTop: '1px solid var(--border-subtle)',
        padding: '4rem 0 2rem 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--accent-primary)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                }}
              >
                TC
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                }}
              >
                TC Web & Studio
              </span>
            </div>
            <p
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Creative digital agency for websites, social media, and video editing.
            </p>

            {/* Instagram Link Section */}
            <div>
              {hasInstagram ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ gap: '0.4rem', fontSize: '0.8rem' }}
                >
                  <InstagramIcon size={15} /> Instagram
                </a>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.35rem 0.75rem',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    color: 'var(--text-faint)',
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
                fontSize: '0.95rem',
                marginBottom: '1rem',
                color: 'var(--text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Navigation
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.9rem',
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
                  Packages
                </Link>
              </li>
              <li>
                <a href="/#approach" style={{ color: 'var(--text-muted)' }}>
                  Our Approach
                </a>
              </li>
              <li>
                <Link to="/team" style={{ color: 'var(--text-muted)' }}>
                  Team
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-muted)' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                marginBottom: '1rem',
                color: 'var(--text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Services
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
              }}
            >
              <li>Website Development</li>
              <li>Social Media Management</li>
              <li>Instagram Management</li>
              <li>Video Editing & Content</li>
              <li>Branding & Digital Design</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4
              style={{
                fontSize: '0.95rem',
                marginBottom: '1rem',
                color: 'var(--text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Contact
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.9rem',
              }}
            >
              {settings.contactEmail && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={15} style={{ color: 'var(--accent-primary)' }} />
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {settings.contactEmail}
                  </a>
                </div>
              )}
              {settings.contactPhone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={15} style={{ color: 'var(--accent-primary)' }} />
                  <a
                    href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {settings.contactPhone}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Clean copyright, no admin link */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.825rem',
            color: 'var(--text-faint)',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} TC Web & Studio. All rights reserved.
          </div>
          <div>Simple, reliable digital solutions.</div>
        </div>
      </div>
    </footer>
  );
}
