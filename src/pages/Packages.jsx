import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Package, Sparkles, Filter, RefreshCw } from 'lucide-react';
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
      setError('Unable to load service packages right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Compute categories dynamically
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
    <div className="packages-page" style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> Service Bundles
          </span>
          <h1 className="section-title">
            Tailored <span className="gradient-text">Service Packages</span>
          </h1>
          <p className="section-description">
            Transparent, results-driven packages designed for growing brands. Each package
            includes clear deliverables, dedicated support, and optional downloadable PDF
            brochures.
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
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 0',
              color: 'var(--text-muted)',
            }}
          >
            <RefreshCw
              size={32}
              style={{
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem auto',
                display: 'block',
                color: 'var(--accent-primary)',
              }}
            />
            <p>Loading available service packages...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error" style={{ maxWidth: '600px', margin: '2rem auto' }}>
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

        {/* Empty Packages State (Friendly message requirement) */}
        {!loading && !error && filteredPackages.length === 0 && (
          <div className="packages-empty">
            <Package className="packages-empty-icon" />
            <h3 className="packages-empty-title">No Packages Available</h3>
            <p className="packages-empty-desc">
              {selectedCategory !== 'All'
                ? `There are currently no active packages under "${selectedCategory}".`
                : 'We are currently updating our service packages. Please check back shortly or get in touch for a custom proposal.'}
            </p>
            {selectedCategory !== 'All' ? (
              <Button variant="outline" onClick={() => handleFilterClick('All')}>
                View All Categories
              </Button>
            ) : (
              <a href="/contact">
                <Button variant="primary">Contact For Custom Proposal</Button>
              </a>
            )}
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
          className="glass-card"
          style={{
            marginTop: '5rem',
            textAlign: 'center',
            padding: '3rem 2rem',
            border: '1px solid var(--border-medium)',
          }}
        >
          <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Looking for a Bespoke Custom Retainer?
          </h3>
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto 2rem auto',
              color: 'var(--text-muted)',
            }}
          >
            We regularly formulate custom agreements combining high-frequency video editing,
            continuous web development sprints, and daily Instagram management for high-growth
            clients.
          </p>
          <a href="/contact">
            <Button variant="secondary" size="lg">
              Inquire About Custom Retainers
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
