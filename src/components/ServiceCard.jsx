import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features = [],
  ctaText = 'Explore Packages',
  ctaLink = '/packages',
}) {
  return (
    <div className="glass-card service-card">
      {Icon && (
        <div className="service-icon-box">
          <Icon size={26} />
        </div>
      )}
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-desc">{description}</p>

      {features.length > 0 && (
        <ul className="service-features-list">
          {features.map((item, idx) => (
            <li key={idx} className="service-feature-item">
              <Check size={16} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <Link to={ctaLink} className="service-card-action">
        <span>{ctaText}</span>
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
