import React from 'react';
import { Users, ArrowUpRight } from 'lucide-react';
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
      focusArea: 'Short-form video editing, visual pacing, and creative content.',
    },
    {
      name: 'Nidhith',
      role: 'Social Media & Client Handling',
      initials: 'NI',
      focusArea: 'Social campaigns, client communication, and community management.',
    },
    {
      name: 'Hemant',
      role: 'Web Development',
      initials: 'H',
      focusArea: 'Responsive websites, performance tuning, and frontend engineering.',
    },
  ];

  return (
    <div className="team-page" style={{ paddingTop: '6.5rem', paddingBottom: '4.5rem' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Users size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Team
          </span>
          <h1 className="section-title">Meet Our Team</h1>
          <p className="section-description">
            Dedicated digital specialists focused on delivering results for your brand.
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

        {/* Call to action */}
        <div
          className="cta-banner"
          style={{ marginTop: '4rem' }}
        >
          <h2>Work With Us</h2>
          <p>
            Have a project in mind? We're ready to discuss your goals and collaborate.
          </p>
          <Link to="/contact">
            <Button variant="primary">
              Get in Touch <ArrowUpRight size={15} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
