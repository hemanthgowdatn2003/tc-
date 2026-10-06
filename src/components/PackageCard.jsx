import React from 'react';
import { Check, FileText, ArrowUpRight, Download, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function PackageCard({ pkg, isFeatured = false }) {
  const isCustomPrice = pkg.priceType === 'custom' || !pkg.price;
  const displayPrice = isCustomPrice
    ? pkg.customPriceLabel || 'Contact for pricing'
    : pkg.price;

  return (
    <div className={`package-card ${isFeatured ? 'featured' : ''}`}>
      <div className="package-header">
        <div className="package-top-meta">
          <span className="package-category">{pkg.category}</span>
          {pkg.badge && (
            <span className="badge badge-cyan">
              <Sparkles size={12} /> {pkg.badge}
            </span>
          )}
        </div>
        <h3 className="package-name">{pkg.name}</h3>
        <p className="package-desc">{pkg.description}</p>
      </div>

      <div className="package-price-box">
        {isCustomPrice ? (
          <span className="package-price-custom">{displayPrice}</span>
        ) : (
          <>
            <span className="package-price">{displayPrice}</span>
            {pkg.billingPeriod && (
              <span className="package-period">/ {pkg.billingPeriod}</span>
            )}
          </>
        )}
      </div>

      {pkg.features && pkg.features.length > 0 && (
        <ul className="package-features">
          {pkg.features.map((feature, idx) => (
            <li key={idx} className="package-feature-item">
              <Check size={16} className="package-feature-icon" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* PDF Brochure view/download button if attached */}
      {pkg.brochureUrl && (
        <div className="package-brochure-box">
          <a
            href={pkg.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brochure-link"
            title="Download or view PDF brochure"
          >
            <FileText size={16} />
            <span>View PDF Brochure</span>
            <Download size={14} style={{ marginLeft: 'auto' }} />
          </a>
        </div>
      )}

      <div className="package-footer">
        <Link
          to={`/contact?package=${encodeURIComponent(pkg.name)}`}
          style={{ width: '100%', display: 'block' }}
        >
          <Button
            variant={isFeatured ? 'primary' : 'outline'}
            className="package-cta"
          >
            <span>{isCustomPrice ? 'Request Custom Quote' : 'Choose Package'}</span>
            <ArrowUpRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
