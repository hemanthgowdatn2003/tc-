import React from 'react';
import '../styles/team.css';

export default function TeamMember({ name, role, initials, focusArea, imageSrc }) {
  return (
    <div className="team-card">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={name}
          className="team-avatar"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div className="team-avatar">{initials}</div>
      )}
      <h3 className="team-name">{name}</h3>
      <span className="team-role">{role}</span>
      {focusArea && <p className="team-focus-area">{focusArea}</p>}
    </div>
  );
}
