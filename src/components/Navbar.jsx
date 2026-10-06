import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="nav-brand" onClick={handleLinkClick}>
          <div className="brand-icon">TC</div>
          <div className="brand-text">
            <span className="brand-main">TC Web & Studio</span>
            <span className="brand-sub">Digital Agency</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-desktop">
          <ul className={`nav-links ${mobileOpen ? 'open' : ''}`}>
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
                    <a
                      href={item.path}
                      className="nav-link"
                      onClick={handleLinkClick}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={handleLinkClick}
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
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
