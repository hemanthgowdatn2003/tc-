import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  Share2,
  Video,
  Palette,
  CheckCircle,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import InstagramIcon from '../components/InstagramIcon';
import Button from '../components/Button';

export default function Services() {
  const serviceDetails = [
    {
      id: 'web-development',
      icon: Code,
      badge: 'Web',
      title: 'Website Design & Development',
      description:
        'Fast, responsive, and mobile-friendly websites designed for performance and conversions.',
      deliverables: [
        'Custom responsive UI design',
        'Modern code with React & HTML5/CSS3',
        'Mobile, tablet, and desktop optimization',
        'On-page SEO fundamentals & fast load speeds',
        'Contact form & interactive elements',
      ],
    },
    {
      id: 'social-media',
      icon: Share2,
      badge: 'Social',
      title: 'Social Media Management',
      description:
        'Consistent content scheduling and custom graphics to build audience engagement.',
      deliverables: [
        'Monthly content calendar planning',
        'Custom designed graphic posts',
        'Caption copywriting & hashtag strategy',
        'Audience interaction & messaging handling',
        'Monthly performance reporting',
      ],
    },
    {
      id: 'instagram-management',
      icon: InstagramIcon,
      badge: 'Instagram',
      title: 'Instagram Account Management',
      description:
        'End-to-end Instagram curation to improve brand aesthetic, reach, and engagement.',
      deliverables: [
        'Aesthetic feed grid layout curation',
        'Short-form vertical Reels & Story graphics',
        'Bio optimization & link structuring',
        'Targeted hashtag & caption strategy',
        'Active engagement monitoring',
      ],
    },
    {
      id: 'video-editing',
      icon: Video,
      badge: 'Video',
      title: 'Video Editing & Creative Content',
      description:
        'High-retention short-form video editing crafted for Instagram Reels and YouTube Shorts.',
      deliverables: [
        'Dynamic hook pacing & smooth cuts',
        'Animated captions & kinetic subtitles',
        'Sound effects, music sync & audio leveling',
        'Vertical 9:16 and widescreen 16:9 formats',
        'Color grading & visual styling',
      ],
    },
    {
      id: 'branding-creative',
      icon: Palette,
      badge: 'Branding',
      title: 'Branding & Digital Creative Services',
      description:
        'Distinct brand logos and digital visual assets to give your company a recognizable presence.',
      deliverables: [
        'Logo design & visual brand guidelines',
        'Color palette & typography standards',
        'Social media banner templates',
        'Digital presentation decks & PDF brochures',
      ],
    },
  ];

  return (
    <div className="services-page" style={{ paddingTop: '6.5rem', paddingBottom: '4.5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Services</span>
          <h1 className="section-title">Our Digital Services</h1>
          <p className="section-description">
            Clean, reliable creative digital solutions for modern businesses.
          </p>
        </div>

        {/* Concise Service Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '4rem' }}>
          {serviceDetails.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                id={service.id}
                className="glass-card"
                style={{
                  padding: '2rem 2.25rem',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '2.5rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.25rem 0.65rem',
                      background: 'var(--accent-light)',
                      border: '1px solid var(--accent-border)',
                      borderRadius: 'var(--radius-full)',
                      color: 'var(--accent-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                    }}
                  >
                    <IconComponent size={13} />
                    <span>{service.badge}</span>
                  </div>

                  <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    {service.title}
                  </h2>
                  <p style={{ lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link to={`/contact?service=${encodeURIComponent(service.title)}`}>
                      <Button variant="primary" size="sm">
                        Request Quote <ArrowUpRight size={14} />
                      </Button>
                    </Link>
                    <Link to="/packages">
                      <Button variant="outline" size="sm">
                        View Packages
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Deliverables List */}
                <div
                  style={{
                    background: '#0d1320',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '0.9rem',
                      marginBottom: '0.85rem',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Layers size={14} style={{ color: 'var(--accent-primary)' }} />
                    Deliverables
                  </h4>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.55rem',
                    }}
                  >
                    {service.deliverables.map((item, dIdx) => (
                      <li
                        key={dIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <CheckCircle
                          size={14}
                          style={{
                            color: 'var(--accent-primary)',
                            flexShrink: 0,
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
          <h2>Need a Custom Project?</h2>
          <p>
            Tell us about your requirements and we will suggest the right approach for your budget.
          </p>
          <Link to="/contact">
            <Button variant="primary">
              Contact Us <ArrowUpRight size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
