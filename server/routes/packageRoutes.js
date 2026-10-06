import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// GET /api/packages - Returns only active packages
router.get('/', (req, res) => {
  try {
    const packages = db.getPackages();
    const activePackages = packages.filter((pkg) => pkg.isActive);
    res.json({
      success: true,
      packages: activePackages,
    });
  } catch (err) {
    console.error('Error fetching packages:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve packages at this time.',
    });
  }
});

// GET /api/packages/:id - Returns single package if active
router.get('/:id', (req, res) => {
  try {
    const packages = db.getPackages();
    const pkg = packages.find((p) => p.id === req.params.id && p.isActive);
    if (!pkg) {
      return res.status(404).json({
        success: false,
        error: 'Package not found.',
      });
    }
    res.json({
      success: true,
      package: pkg,
    });
  } catch (err) {
    console.error('Error fetching package:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to retrieve package details.',
    });
  }
});

export default router;
