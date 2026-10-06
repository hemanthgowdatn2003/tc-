import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/team - Returns all active team members
router.get('/', (req, res) => {
  try {
    const team = db.getTeamMembers();
    const activeTeam = team.filter((member) => member.isActive !== false);
    res.json({
      success: true,
      team: activeTeam,
    });
  } catch (err) {
    console.error('Error fetching team members:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve team members at this time.',
    });
  }
});

export default router;
