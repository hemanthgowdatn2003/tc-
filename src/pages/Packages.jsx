import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Sparkles, RefreshCw } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import Button from '../components/Button';
import { api } from '../services/api';
import '../styles/packages.css';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'All';

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPackages();
      setPackages(data);
    } catch (err) {
      console.error('Error fetching packages:', err);
      setError('Unable to load service packages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const categories = ['All', ...new Set(packages.map((p) => p.category).filter(Boolean))];

  const filteredPackages =
    selectedCategory === 'All'
      ? packages
      : packages.filter((p) => p.category === selectedCategory);

  const handleFilterClick = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="packages-page" style={{ paddingTop: '6.5rem', paddingBottom: '4.5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Pricing
          </span>
          <h1 className="section-title">Service Packages</h1>
          <p className="section-description">
            Simple, transparent packages. View details or download PDF brochures.
          </p>
        </div>

        {/* Categories Filter Bar */}
        {categories.length > 1 && (
          <div className="packages-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <RefreshCw
              size={28}
              style={{
                animation: 'spin 1s linear infinite',
                margin: '0 auto 0.75rem auto',
                display: 'block',
                color: 'var(--accent-primary)',
              }}
            />
            <p style={{ fontSize: '0.9rem' }}>Loading packages...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchPackages}
              style={{ marginLeft: 'auto' }}
            >
              Retry
            </Button>
          </div>
        )}

        {/* Empty Packages State */}
        {!loading && !error && filteredPackages.length === 0 && (
          <div className="packages-empty">
            <Package className="packages-empty-icon" />
            <h3 className="packages-empty-title">No Packages in this Category</h3>
            <p className="packages-empty-desc">
              Please choose another category or contact us for a custom quote.
            </p>
            <Button variant="outline" onClick={() => handleFilterClick('All')}>
              View All
            </Button>
          </div>
        )}

        {/* Packages Grid */}
        {!loading && !error && filteredPackages.length > 0 && (
          <div className="packages-grid">
            {filteredPackages.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} isFeatured={idx === 1} />
            ))}
          </div>
        )}

        {/* Bottom Custom Inquiry Box */}
        <div
          className="cta-banner"
          style={{ marginTop: '4rem' }}
        >
          <h2>Need Custom Pricing?</h2>
          <p>
            We formulate tailored retainers combining web, video, and social management.
          </p>
          <a href="/contact">
            <Button variant="secondary">
              Request Custom Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
