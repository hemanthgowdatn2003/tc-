import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

// GET /api/settings - Public settings
router.get('/', (req, res) => {
  try {
    const fileSettings = db.getSettings();
    // Prioritize environment variable if set, otherwise file setting
    const envInstagram = process.env.INSTAGRAM_URL ? process.env.INSTAGRAM_URL.trim() : '';
    const instagramUrl = envInstagram || fileSettings.instagramUrl || '';

    res.json({
      success: true,
      settings: {
        ...fileSettings,
        instagramUrl,
      },
    });
  } catch (err) {
    console.error('Settings fetch error:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve settings.',
    });
  }
});

// PUT /api/admin/settings - Protected update
router.put('/', requireAdmin, (req, res) => {
  try {
    const current = db.getSettings();
    const { instagramUrl, contactEmail, contactPhone, agencyName, tagline } = req.body;

    const updated = {
      ...current,
      instagramUrl: instagramUrl !== undefined ? String(instagramUrl).trim() : current.instagramUrl,
      contactEmail: contactEmail !== undefined ? String(contactEmail).trim() : current.contactEmail,
      contactPhone: contactPhone !== undefined ? String(contactPhone).trim() : current.contactPhone,
      agencyName: agencyName !== undefined ? String(agencyName).trim() : current.agencyName,
      tagline: tagline !== undefined ? String(tagline).trim() : current.tagline,
    };

    db.saveSettings(updated);

    res.json({
      success: true,
      settings: updated,
      message: 'Settings updated successfully.',
    });
  } catch (err) {
    console.error('Settings update error:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to update settings.',
    });
  }
});

export default router;
