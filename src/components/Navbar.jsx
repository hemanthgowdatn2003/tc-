import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Packages', path: '/packages' },
    { label: 'Our Approach', path: '/#approach' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Close when resized to desktop viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="nav-brand" onClick={closeMenu}>
            <div className="brand-icon">TC</div>
            <div className="brand-text">
              <span className="brand-main">TC Web & Studio</span>
              <span className="brand-sub">Digital Agency</span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}
          <nav className="nav-desktop" aria-label="Main Navigation">
            <ul className="desktop-links">
              {navItems.map((item) => {
                const isAnchor = item.path.includes('#');
                const isActive =
                  !isAnchor &&
                  (item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path));

                return (
                  <li key={item.label}>
                    {isAnchor ? (
                      <a href={item.path} className="desktop-link">
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className={`desktop-link ${isActive ? 'active' : ''}`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay - Rendered outside header to guarantee isolation & z-index */}
      <div
        id="mobile-nav-drawer"
        className={`mobile-menu-wrapper ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop for click-outside dismissal */}
        <div
          className="mobile-backdrop"
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Solid Content Drawer */}
        <div className="mobile-drawer-sheet">
          <div className="mobile-drawer-header">
            <div className="mobile-brand-pill">
              <span className="brand-icon-sm">TC</span>
              <span className="mobile-brand-title">TC Web & Studio</span>
            </div>
            <button
              type="button"
              className="mobile-drawer-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="mobile-nav-list" aria-label="Mobile Navigation">
            {navItems.map((item) => {
              const isAnchor = item.path.includes('#');
              const isActive =
                !isAnchor &&
                (item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path));

              return (
                <div key={item.label} className="mobile-nav-item">
                  {isAnchor ? (
                    <a
                      href={item.path}
                      className="mobile-nav-link"
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={16} className="nav-arrow" />
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={16} className="nav-arrow" />
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Agency Location & Quick Contact in Mobile Drawer */}
          <div className="mobile-drawer-footer">
            <div className="mobile-location-tag">
              <MapPin size={14} />
              <span>Mysore, Karnataka, India</span>
            </div>
            <div className="mobile-cta-box">
              <Link to="/contact" className="btn btn-primary btn-block" onClick={closeMenu}>
                Get Started <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
