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
import '../styles/services.css';

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
    <div className="services-page">
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
        <div className="services-detail-list">
          {serviceDetails.map((service) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                id={service.id}
                className="service-detail-card"
              >
                <div>
                  <div className="service-detail-badge">
                    <IconComponent size={13} />
                    <span>{service.badge}</span>
                  </div>

                  <h2 className="service-detail-title">
                    {service.title}
                  </h2>
                  <p className="service-detail-desc">
                    {service.description}
                  </p>

                  <div className="service-detail-actions">
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
                <div className="service-deliverables-box">
                  <h4 className="service-deliverables-heading">
                    <Layers size={14} style={{ color: 'var(--accent-primary)' }} />
                    Deliverables
                  </h4>
                  <ul className="service-deliverables-list">
                    {service.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="service-deliverables-item">
                        <CheckCircle size={14} />
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
