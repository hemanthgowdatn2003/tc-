import React, { useState, useEffect } from 'react';
import { Users, ArrowUpRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamMember from '../components/TeamMember';
import Button from '../components/Button';
import { api } from '../services/api';
import '../styles/team.css';

const DEFAULT_MEMBERS = [
  {
    id: 'team-naveen',
    name: 'Naveen',
    role: 'Video & Creative',
    initials: 'N',
    focusArea: 'Short-form video editing, visual pacing, and creative content.',
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

export default function Team() {
  const [teamMembers, setTeamMembers] = useState(DEFAULT_MEMBERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .getTeam()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setTeamMembers(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch live team list, using local defaults:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="team-page">
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
              key={member.id || member.name}
              name={member.name}
              role={member.role}
              initials={member.initials}
              focusArea={member.focusArea}
              imageSrc={member.imageUrl}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="cta-banner" style={{ marginTop: '4rem' }}>
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
