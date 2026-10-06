import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Share2,
  Video,
  Palette,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Users,
  Compass,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import ServiceCard from '../components/ServiceCard';
import PackageCard from '../components/PackageCard';
import TeamMember from '../components/TeamMember';
import Button from '../components/Button';
import { api } from '../services/api';
import '../styles/home.css';

const DEFAULT_TEAM = [
  {
    id: 'team-naveen',
    name: 'Naveen',
    role: 'Video & Creative',
    initials: 'N',
    focusArea: 'Short-form video editing, visual storytelling, and creative content.',
  },
  {
    id: 'team-nidhith',
    name: 'Nidhith',
    role: 'Social Media & Client Handling',
    initials: 'NI',
    focusArea: 'Social campaigns, client communication, and community management.',
  },
  {
    id: 'team-hemant',
    name: 'Hemant',
    role: 'Web Development',
    initials: 'H',
    focusArea: 'Responsive websites, performance tuning, and frontend engineering.',
  },
];

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM);
  const [settings, setSettings] = useState({ instagramUrl: '' });
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      api.getPackages().catch(() => []),
      api.getSettings().catch(() => ({ instagramUrl: '' })),
      api.getTeam().catch(() => []),
    ]).then(([pkgs, siteSettings, liveTeam]) => {
      if (isMounted) {
        setPackages(pkgs);
        setSettings(siteSettings);
        if (Array.isArray(liveTeam) && liveTeam.length > 0) {
          setTeamMembers(liveTeam);
        }
        setLoadingPackages(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const coreServices = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Modern, fast, and responsive websites built to turn visitors into clients.',
      features: ['Mobile-friendly design', 'Fast loading speeds', 'SEO optimization'],
      link: '/services',
    },
    {
      icon: Share2,
      title: 'Social Media Management',
      description: 'Consistent content planning and graphic design to grow your brand reach.',
      features: ['Content scheduling', 'Branded post graphics', 'Audience engagement'],
      link: '/services',
    },
    {
      icon: InstagramIcon,
      title: 'Instagram Management',
      description: 'Curated feed layouts, aesthetic grids, and high-converting Reels.',
      features: ['Grid layout curation', 'Reels & Stories creation', 'Bio & link optimization'],
      link: '/services',
    },
    {
      icon: Video,
      title: 'Video Editing',
      description: 'Short-form videos edited for maximum retention on Reels and Shorts.',
      features: ['Dynamic captions & pacing', 'Sound design & hooks', 'Vertical 9:16 format'],
      link: '/services',
    },
    {
      icon: Palette,
      title: 'Branding & Creative',
      description: 'Distinct brand logos and digital design assets for your business.',
      features: ['Logo & style guides', 'Marketing graphics', 'Presentation decks'],
      link: '/services',
    },
  ];

  const approachSteps = [
    {
      number: '01',
      title: 'Requirements',
      desc: 'Understand your goals, target audience, and project scope.',
    },
    {
      number: '02',
      title: 'Planning',
      desc: 'Agree on deliverables, timeline, and project milestones.',
    },
    {
      number: '03',
      title: 'Design & Build',
      desc: 'Craft clean code, visuals, and multimedia content.',
    },
    {
      number: '04',
      title: 'Refinement',
      desc: 'Review together and polish every detail based on feedback.',
    },
    {
      number: '05',
      title: 'Launch & Support',
      desc: 'Deliver final files and provide agreed post-launch support.',
    },
  ];

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim());

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in">
              <Sparkles size={14} /> Creative Digital Services
            </div>
            <h1 className="hero-headline animate-fade-in">
              <span className="hero-word-wrap">Digital Solutions</span>{' '}
              <span className="hero-word-wrap">That Grow Your</span>{' '}
              <span className="hero-word-wrap accent-text">Business</span>
            </h1>
            <p className="hero-description animate-fade-in">
              We build fast websites, manage social channels, and produce engaging videos
              for modern brands.
            </p>

            <div className="hero-cta-group animate-fade-in">
              <Link to="/services" className="hero-cta-link">
                <Button variant="primary" size="lg" className="hero-btn">
                  Explore Services <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/packages" className="hero-cta-link">
                <Button variant="outline" size="lg" className="hero-btn">
                  View Packages <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>

            {/* Metrics Bar */}
            <div className="metrics-bar">
              <div className="metric-item">
                <div className="metric-value">100%</div>
                <div className="metric-label">Client Focused</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">5+</div>
                <div className="metric-label">Core Services</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">Mysore</div>
                <div className="metric-label">Karnataka, India</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">Direct</div>
                <div className="metric-label">Client Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Overview Section */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Services</span>
            <h2 className="section-title">What We Offer</h2>
            <p className="section-description">
              Focused digital services designed to help your brand stand out.
            </p>
          </div>

          <div className="services-grid">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                ctaLink={service.link}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/services">
              <Button variant="outline">
                All Services Details <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Service Packages */}
      <section className="section" id="packages" style={{ background: '#0e1422' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Packages</span>
            <h2 className="section-title">Popular Service Packages</h2>
            <p className="section-description">
              Clear pricing and deliverables. Download brochures or get started directly.
            </p>
          </div>

          {loadingPackages ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              Loading packages...
            </div>
          ) : packages.length > 0 ? (
            <div className="packages-grid">
              {packages.slice(0, 3).map((pkg, idx) => (
                <PackageCard key={pkg.id} pkg={pkg} isFeatured={idx === 1} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
              No service packages are currently published.
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/packages">
              <Button variant="primary">
                View All Packages & Brochures <ArrowUpRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Approach (5 Steps) */}
      <section className="section" id="approach">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Compass size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Process
            </span>
            <h2 className="section-title">Our 5-Step Approach</h2>
            <p className="section-description">
              A straightforward process from concept to delivery.
            </p>
          </div>

          <div className="approach-steps">
            {approachSteps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Spotlight Banner */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="instagram-banner">
            <div className="instagram-banner-content">
              <div className="instagram-badge">
                <InstagramIcon size={13} /> Instagram
              </div>
              <h3 className="instagram-banner-title">Instagram Account Management</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                We curate clean aesthetic grids, produce short-form Reels, and manage audience engagement.
              </p>
            </div>

            <div>
              {hasInstagram ? (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <InstagramIcon size={16} /> View Instagram <ArrowUpRight size={15} />
                </a>
              ) : (
                <div className="instagram-coming-soon">
                  <InstagramIcon size={15} />
                  <span>Instagram link coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Introduction Section */}
      <section className="section" id="team" style={{ background: '#0e1422' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Team
            </span>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-description">
              The creative specialists delivering your projects.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.id || member.name}
                name={member.name}
                role={member.role}
                initials={member.initials}
                focusArea={member.focusArea}
                imageSrc={member.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Call to Action */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Start Your Project?</h2>
            <p>
              Contact us today for websites, social media management, or video editing.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch <ArrowUpRight size={16} />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="lg">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
