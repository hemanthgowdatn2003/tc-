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
  CheckCircle2,
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

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [settings, setSettings] = useState({ instagramUrl: '' });
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      api.getPackages().catch(() => []),
      api.getSettings().catch(() => ({ instagramUrl: '' })),
    ]).then(([pkgs, siteSettings]) => {
      if (isMounted) {
        setPackages(pkgs);
        setSettings(siteSettings);
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
      title: 'Website Design & Development',
      description:
        'Fast, responsive, and search-optimized business websites designed to turn visitors into paying customers.',
      features: [
        'Custom modern UI/UX design',
        'Mobile-first responsive architecture',
        'Clean, accessible code & fast page speeds',
        'Built-in SEO & search visibility foundations',
      ],
      link: '/services',
    },
    {
      icon: Share2,
      title: 'Social Media Management',
      description:
        'Full-funnel social media strategy that builds brand authority and active community engagement across channels.',
      features: [
        'Content calendar planning & curation',
        'Brand-aligned graphic post design',
        'Audience engagement & message management',
        'Monthly data-driven analytics reports',
      ],
      link: '/services',
    },
    {
      icon: InstagramIcon,
      title: 'Instagram Account Management',
      description:
        'End-to-end Instagram curation designed to elevate your aesthetic, increase reach, and convert profile visitors.',
      features: [
        'Aesthetic feed grid layout curation',
        'High-converting Reels & Stories production',
        'Bio optimization & highlight branding',
        'Targeted hashtag & caption copywriting',
      ],
      link: '/services',
    },
    {
      icon: Video,
      title: 'Video Editing & Creative Content',
      description:
        'High-retention short-form video editing crafted for Instagram Reels, YouTube Shorts, and promotional campaigns.',
      features: [
        'Dynamic hook pacing & narrative rhythm',
        'Animated captions, sound design & SFX',
        'Color grading & visual styling',
        'Multi-aspect ratio formatting (9:16 & 16:9)',
      ],
      link: '/services',
    },
    {
      icon: Palette,
      title: 'Branding & Digital Creative Services',
      description:
        'Distinct brand identities, logos, and visual digital assets that give your company a recognizable, premium presence.',
      features: [
        'Logo design & visual brand guides',
        'Color schemes & typography pairings',
        'Marketing collaterals & digital banners',
        'Social media kit & design templates',
      ],
      link: '/services',
    },
  ];

  const approachSteps = [
    {
      number: '01',
      title: 'Understand Requirements',
      desc: 'We dive deep into your goals, audience, and vision to clearly define project scope and requirements.',
    },
    {
      number: '02',
      title: 'Plan & Agree Deliverables',
      desc: 'We map out the timeline, milestones, and deliverables so expectations are aligned from day one.',
    },
    {
      number: '03',
      title: 'Design & Create Content',
      desc: 'Our specialists craft high-quality code, visual designs, and multimedia assets tailored to your brand.',
    },
    {
      number: '04',
      title: 'Review & Refine Work',
      desc: 'We iterate collaboratively with your feedback to polish every detail to high professional standards.',
    },
    {
      number: '05',
      title: 'Deliver & Ongoing Support',
      desc: 'We launch the project smoothly and provide agreed support to ensure long-term success.',
    },
  ];

  const teamMembers = [
    {
      name: 'Naveen',
      role: 'Video & Creative',
      initials: 'N',
      focusArea:
        'Short-form video editing, visual storytelling, dynamic pacing, and multimedia creative assets.',
    },
    {
      name: 'Nidhith',
      role: 'Social Media & Client Handling',
      initials: 'NI',
      focusArea:
        'Strategic social campaigns, client communications, community relations, and content planning.',
    },
    {
      name: 'Hemant',
      role: 'Web Development',
      initials: 'H',
      focusArea:
        'Full-stack frontend and backend web development, responsive engineering, and performance optimization.',
    },
  ];

  const hasInstagram = Boolean(settings.instagramUrl && settings.instagramUrl.trim());

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow-1"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in">
              <Sparkles size={16} /> Creative Digital Services Agency
            </div>
            <h1 className="hero-headline animate-fade-in">
              Elevate Your Brand With <br />
              <span className="gradient-text">High-Impact Digital Solutions</span>
            </h1>
            <p className="hero-description animate-fade-in">
              TC Web & Studio designs modern responsive websites, curates vibrant social
              media and Instagram channels, and edits cinematic video content that connects
              with your audience.
            </p>

            <div className="hero-cta-group animate-fade-in">
              <Link to="/services">
                <Button variant="primary" size="lg">
                  Explore Services <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="lg">
                  View Packages <ArrowUpRight size={18} />
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
                <div className="metric-label">Digital Disciplines</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">Fast</div>
                <div className="metric-label">Turnaround Cycles</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">Modern</div>
                <div className="metric-label">Tech & Creative Stack</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Overview Section */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">
              Our Core <span className="gradient-text">Agency Services</span>
            </h2>
            <p className="section-description">
              Tailored digital solutions built to elevate your business presence across web,
              social channels, and multimedia.
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

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/services">
              <Button variant="outline">
                View Detailed Services Breakdown <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Service Packages */}
      <section
        className="section"
        id="packages"
        style={{ background: 'rgba(15, 23, 42, 0.4)' }}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Service Packages</span>
            <h2 className="section-title">
              Transparent, Scalable <span className="gradient-text">Packages</span>
            </h2>
            <p className="section-description">
              Choose from our curated service bundles or request a custom package designed
              specifically for your business requirements.
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

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/packages">
              <Button variant="primary">
                View All Packages & PDF Brochures <ArrowUpRight size={18} />
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
              <Compass size={14} /> Workflow Process
            </span>
            <h2 className="section-title">
              Our <span className="gradient-text">5-Step Approach</span>
            </h2>
            <p className="section-description">
              A structured and transparent creative process ensuring precision, communication,
              and outstanding results from start to finish.
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
                <InstagramIcon size={14} /> Instagram Management
              </div>
              <h3 className="instagram-banner-title">
                Curating Brands That Stand Out On Instagram
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem' }}>
                We engineer visually arresting grids, scroll-stopping Reels, and high-impact
                stories designed to build an engaged community around your business.
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
                  <InstagramIcon size={18} /> Visit Official Instagram <ArrowUpRight size={16} />
                </a>
              ) : (
                <div className="instagram-coming-soon">
                  <InstagramIcon size={18} style={{ color: '#f43f5e' }} />
                  <span>Instagram link coming soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Introduction Section */}
      <section className="section" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Users size={14} /> The Team
            </span>
            <h2 className="section-title">
              Meet Our <span className="gradient-text">Creative Specialists</span>
            </h2>
            <p className="section-description">
              Dedicated professionals combining technical precision and visual creativity to
              bring your brand's vision to reality.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <TeamMember
                key={member.name}
                name={member.name}
                role={member.role}
                initials={member.initials}
                focusArea={member.focusArea}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/team">
              <Button variant="outline">
                Learn More About The Team <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Call to Action */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Elevate Your Digital Presence?</h2>
            <p>
              Let's discuss your next website, social campaign, or creative video project.
              Get in touch with our team today.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Start Your Project <ArrowUpRight size={18} />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="outline" size="lg">
                  Explore Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
