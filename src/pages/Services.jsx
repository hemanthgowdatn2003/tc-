import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Share2,
  Video,
  Palette,
  CheckCircle,
  ArrowRight,
  ArrowUpRight,
  Laptop,
  Flame,
  Smartphone,
  Layers,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import Button from '../components/Button';

export default function Services() {
  const serviceDetails = [
    {
      id: 'web-development',
      icon: Code,
      badge: 'Core Specialty',
      title: 'Website Design & Development',
      subtitle: 'Modern, high-performance web solutions built for businesses that demand quality.',
      description:
        'We engineer websites that combine aesthetic refinement with rock-solid performance. From single-page landing sites to multi-page corporate hubs, every project is built mobile-responsive, lightning-fast, and search-optimized.',
      deliverables: [
        'Custom responsive UI/UX design (Figma to Code)',
        'Modern frontend engineering with React, Vite & semantic HTML5/CSS3',
        'Cross-browser and mobile device compatibility',
        'On-page SEO, metadata structure & performance tuning',
        'Contact forms, interactive components & analytics integration',
        'Secure deployment and post-launch maintenance',
      ],
      packageLink: '/packages?category=Website%20Design%20%26%20Development',
    },
    {
      id: 'social-media',
      icon: Share2,
      badge: 'Audience Growth',
      title: 'Social Media Management',
      subtitle: 'Strategic content production and community operations to amplify your reach.',
      description:
        'Consistent social presence requires structured strategy and creative visual storytelling. We manage your content calendars, design custom graphic assets, write compelling captions, and maintain authentic community engagement.',
      deliverables: [
        'Content calendar strategy & monthly scheduling',
        'High-resolution custom graphic design & carousel posts',
        'Brand-aligned caption copywriting & targeted hashtag banks',
        'Audience inquiry monitoring & community interaction',
        'Bi-weekly & monthly performance growth reports',
      ],
      packageLink: '/packages?category=Social%20Media%20%26%20Instagram%20Management',
    },
    {
      id: 'instagram-management',
      icon: InstagramIcon,
      badge: 'Brand Curation',
      title: 'Instagram Account Management',
      subtitle: 'Transform your Instagram profile into a high-converting visual flagship.',
      description:
        'Instagram is the digital storefront for modern brands. We optimize your grid architecture, produce engaging Reels and Story sequences, and build cohesive aesthetic guidelines that position you as an industry leader.',
      deliverables: [
        'Strategic 9-grid and 12-grid aesthetic curation',
        'Short-form vertical Reels production & trend adaptation',
        'Interactive Instagram Stories & custom highlight covers',
        'Profile bio optimization & call-to-action link structuring',
        'Organic reach growth tactics and engagement monitoring',
      ],
      packageLink: '/packages?category=Social%20Media%20%26%20Instagram%20Management',
    },
    {
      id: 'video-editing',
      icon: Video,
      badge: 'High Engagement',
      title: 'Video Editing & Creative Content',
      subtitle: 'Scroll-stopping short-form edits designed for maximum retention.',
      description:
        'In the age of short-form attention, video pacing makes or breaks your content. We edit punchy, cinematic short-form videos (Reels, TikTok, YouTube Shorts) and promotional clips that capture attention within the first two seconds.',
      deliverables: [
        'Dynamic hook editing & retention-focused narrative flow',
        'Animated captions, stylized kinetic typography & emojis',
        'Sound design, background score selection & audio leveling',
        'B-roll integration, zooms, transitions & color grading',
        'Multi-format export (9:16 vertical and 16:9 widescreen)',
      ],
      packageLink: '/packages?category=Video%20Editing%20%26%20Creative%20Content',
    },
    {
      id: 'branding-creative',
      icon: Palette,
      badge: 'Visual Identity',
      title: 'Branding & Digital Creative Services',
      subtitle: 'Memorable brand systems that set you apart in crowded markets.',
      description:
        'From primary logos to complete brand manuals, we craft visual identities that convey trust, credibility, and modern design standards across all digital touchpoints.',
      deliverables: [
        'Primary & secondary logo marks, logotypes & favicons',
        'Curated color palettes & typography pairing guides',
        'Social media banner kits and editable asset templates',
        'Digital presentation decks & PDF company brochures',
        'Complete brand identity guideline documentation',
      ],
      packageLink: '/packages?category=Full%20Creative%20%26%20Digital%20Suite',
    },
  ];

  return (
    <div className="services-page" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Agency Capabilities</span>
          <h1 className="section-title">
            Our Digital & <span className="gradient-text">Creative Services</span>
          </h1>
          <p className="section-description">
            Comprehensive digital services designed specifically for businesses looking to
            scale their online authority, engagement, and customer acquisition.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem' }}>
          {serviceDetails.map((service, index) => {
            const IconComponent = service.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                id={service.id}
                className="glass-card"
                style={{
                  padding: '3rem',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '3rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.3rem 0.85rem',
                      background: 'rgba(56, 189, 248, 0.1)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--accent-primary)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      marginBottom: '1rem',
                    }}
                  >
                    <IconComponent size={14} />
                    <span>{service.badge}</span>
                  </div>

                  <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                    {service.title}
                  </h2>
                  <p
                    style={{
                      color: 'var(--text-main)',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      marginBottom: '1rem',
                    }}
                  >
                    {service.subtitle}
                  </p>
                  <p style={{ lineHeight: 1.7, marginBottom: '2rem' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                      <Button variant="primary">
                        Request Quote <ArrowUpRight size={16} />
                      </Button>
                    </Link>
                    <Link to="/packages">
                      <Button variant="outline">View Packages</Button>
                    </Link>
                  </div>
                </div>

                {/* Deliverables Box */}
                <div
                  style={{
                    background: 'rgba(15, 23, 42, 0.65)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '1.05rem',
                      marginBottom: '1.25rem',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Layers size={18} style={{ color: 'var(--accent-primary)' }} />
                    Key Deliverables
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                    }}
                  >
                    {service.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          fontSize: '0.925rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <CheckCircle
                          size={16}
                          style={{
                            color: 'var(--accent-emerald)',
                            flexShrink: 0,
                            marginTop: '3px',
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA section */}
        <div className="cta-banner">
          <h2>Need a Custom Combination of Services?</h2>
          <p>
            Whether you need a dedicated web development lead or an end-to-end creative
            retainer with ongoing video and social media management, we tailor solutions to
            your specific goals.
          </p>
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Discuss Your Project With Us <ArrowUpRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
