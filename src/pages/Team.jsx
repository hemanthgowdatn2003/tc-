import React from 'react';
import { Users, Video, Share2, Code, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamMember from '../components/TeamMember';
import Button from '../components/Button';
import '../styles/team.css';

export default function Team() {
  const teamMembers = [
    {
      name: 'Naveen',
      role: 'Video & Creative',
      initials: 'N',
      focusArea:
        'Oversees video editing, visual pacing, short-form reels/shorts content production, motion assets, and creative styling.',
    },
    {
      name: 'Nidhith',
      role: 'Social Media & Client Handling',
      initials: 'NI',
      focusArea:
        'Coordinates social media campaigns, client communications, community relations, content schedules, and brand growth.',
    },
    {
      name: 'Hemant',
      role: 'Web Development',
      initials: 'H',
      focusArea:
        'Engineers responsive websites, modern web architecture, frontend and backend systems, speed optimization, and technical integrations.',
    },
  ];

  return (
    <div className="team-page" style={{ paddingTop: '7.5rem', paddingBottom: '6rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Users size={14} /> Our People
          </span>
          <h1 className="section-title">
            The Team Behind <span className="gradient-text">TC Web & Studio</span>
          </h1>
          <p className="section-description">
            A collaborative team of digital specialists combining technical engineering,
            engaging video production, and strategic social media management.
          </p>
        </div>

        {/* Team Cards Grid */}
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

        {/* Working Together Section */}
        <div
          className="glass-card"
          style={{
            marginTop: '5rem',
            padding: '3.5rem 2.5rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent-primary)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.75rem',
              }}
            >
              Collaborative Workflow
            </span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
              Specialized Skills, Unified Execution
            </h2>
            <p
              style={{
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '2rem',
              }}
            >
              Every client project benefits from direct collaboration across our key disciplines:
              clean web engineering, compelling visual video editing, and proactive social media
              operations. We communicate clearly and deliver on agreed milestones.
            </p>

            <Link to="/contact">
              <Button variant="primary" size="lg">
                Connect With Our Team <ArrowUpRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
