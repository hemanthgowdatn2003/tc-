import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { api } from '../services/api';
import '../styles/footer.css';

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
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <Link to="/" className="footer-brand-title">
              <div className="footer-brand-icon">TC</div>
              <span className="footer-brand-name">TC Web & Studio</span>
            </Link>
            <p className="footer-brand-desc">
              Creative digital agency specializing in high-performance web development,
              social media operations, and short-form video editing.
            </p>
            <div className="footer-location-tag">
              <MapPin size={14} />
              <span>Mysore, Karnataka, India</span>
            </div>

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
                    background: 'var(--bg-surface)',
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
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link-item">Home</Link>
              </li>
              <li>
                <Link to="/services" className="footer-link-item">Services</Link>
              </li>
              <li>
                <Link to="/packages" className="footer-link-item">Packages</Link>
              </li>
              <li>
                <a href="/#approach" className="footer-link-item">Our Approach</a>
              </li>
              <li>
                <Link to="/team" className="footer-link-item">Team</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link-item">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Offered */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services#web-development" className="footer-link-item">Website Development</Link>
              </li>
              <li>
                <Link to="/services#social-media" className="footer-link-item">Social Media Management</Link>
              </li>
              <li>
                <Link to="/services#instagram-management" className="footer-link-item">Instagram Management</Link>
              </li>
              <li>
                <Link to="/services#video-editing" className="footer-link-item">Video Editing & Reels</Link>
              </li>
              <li>
                <Link to="/services#branding-creative" className="footer-link-item">Branding & Creative</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="footer-heading">Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="footer-contact-item">
                <MapPin size={15} />
                <span>Mysore, Karnataka, India</span>
              </div>
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="footer-contact-item"
                >
                  <Mail size={15} />
                  <span>{settings.contactEmail}</span>
                </a>
              )}
              {settings.contactPhone && (
                <a
                  href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`}
                  className="footer-contact-item"
                >
                  <Phone size={15} />
                  <span>{settings.contactPhone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            &copy; {new Date().getFullYear()} TC Web & Studio. All rights reserved.
          </div>
          <div>Mysore, Karnataka &bull; Modern Creative Digital Agency</div>
        </div>
      </div>
    </footer>
  );
}
