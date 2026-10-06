import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'tcadmin2026!';

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Password is required.',
    });
  }

  // Constant-time check or direct comparison
  if (password === configuredPassword) {
    req.session.isAdmin = true;
    return res.json({
      success: true,
      message: 'Successfully authenticated.',
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid password. Access denied.',
  });
});

// GET /api/admin/session
router.get('/session', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.json({
      authenticated: true,
    });
  }
  return res.json({
    authenticated: false,
  });
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
      return res.status(500).json({
        success: false,
        error: 'Unable to log out.',
      });
    }
    res.clearCookie('connect.sid');
    return res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  });
});

// GET /api/admin/packages - All packages (active and inactive)
router.get('/packages', requireAdmin, (req, res) => {
  try {
    const packages = db.getPackages();
    res.json({
      success: true,
      packages,
    });
  } catch (err) {
    console.error('Admin get packages error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve packages.',
    });
  }
});

// POST /api/admin/packages - Create a package
router.post('/packages', requireAdmin, (req, res) => {
  try {
    const {
      name,
      category,
      badge = '',
      description = '',
      priceType = 'fixed',
      price = '',
      customPriceLabel = '',
      billingPeriod = '',
      features = [],
      brochureUrl = '',
      imageUrl = '',
      isActive = true,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Package name is required.',
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Package category is required.',
      });
    }

    const cleanFeatures = Array.isArray(features)
      ? features.map((f) => String(f).trim()).filter(Boolean)
      : [];

    const newPackage = {
      id: `pkg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      category: category.trim(),
      badge: (badge || '').trim(),
      description: (description || '').trim(),
      priceType: priceType === 'custom' ? 'custom' : 'fixed',
      price: (price || '').trim(),
      customPriceLabel: (customPriceLabel || '').trim(),
      billingPeriod: (billingPeriod || '').trim(),
      features: cleanFeatures,
      brochureUrl: (brochureUrl || '').trim(),
      imageUrl: (imageUrl || '').trim(),
      isActive: Boolean(isActive),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const packages = db.getPackages();
    packages.unshift(newPackage);
    db.savePackages(packages);

    res.status(201).json({
      success: true,
      package: newPackage,
      message: 'Package created successfully.',
    });
  } catch (err) {
    console.error('Admin create package error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create package.',
    });
  }
});

// PUT /api/admin/packages/:id - Update package
router.put('/packages/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const packages = db.getPackages();
    const index = packages.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Package not found.',
      });
    }

    const current = packages[index];
    const {
      name,
      category,
      badge,
      description,
      priceType,
      price,
      customPriceLabel,
      billingPeriod,
      features,
      brochureUrl,
      imageUrl,
      isActive,
    } = req.body;

    const updatedPackage = {
      ...current,
      name: name !== undefined ? String(name).trim() : current.name,
      category: category !== undefined ? String(category).trim() : current.category,
      badge: badge !== undefined ? String(badge).trim() : current.badge,
      description: description !== undefined ? String(description).trim() : current.description,
      priceType: priceType !== undefined ? (priceType === 'custom' ? 'custom' : 'fixed') : current.priceType,
      price: price !== undefined ? String(price).trim() : current.price,
      customPriceLabel: customPriceLabel !== undefined ? String(customPriceLabel).trim() : current.customPriceLabel,
      billingPeriod: billingPeriod !== undefined ? String(billingPeriod).trim() : current.billingPeriod,
      features: Array.isArray(features) ? features.map((f) => String(f).trim()).filter(Boolean) : current.features,
      brochureUrl: brochureUrl !== undefined ? String(brochureUrl).trim() : current.brochureUrl,
      imageUrl: imageUrl !== undefined ? String(imageUrl).trim() : current.imageUrl,
      isActive: isActive !== undefined ? Boolean(isActive) : current.isActive,
      updatedAt: new Date().toISOString(),
    };

    packages[index] = updatedPackage;
    db.savePackages(packages);

    res.json({
      success: true,
      package: updatedPackage,
      message: 'Package updated successfully.',
    });
  } catch (err) {
    console.error('Admin update package error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update package.',
    });
  }
});

// DELETE /api/admin/packages/:id - Delete package
router.delete('/packages/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const packages = db.getPackages();
    const filtered = packages.filter((p) => p.id !== id);

    if (filtered.length === packages.length) {
      return res.status(404).json({
        success: false,
        error: 'Package not found.',
      });
    }

    db.savePackages(filtered);

    res.json({
      success: true,
      message: 'Package removed successfully.',
    });
  } catch (err) {
    console.error('Admin delete package error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete package.',
    });
  }
});

// GET /api/admin/inquiries - List client contact inquiries
router.get('/inquiries', requireAdmin, (req, res) => {
  try {
    const inquiries = db.getInquiries();
    res.json({
      success: true,
      inquiries,
    });
  } catch (err) {
    console.error('Admin get inquiries error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve inquiries.',
    });
  }
});

// DELETE /api/admin/inquiries/:id
router.delete('/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const inquiries = db.getInquiries();
    const filtered = inquiries.filter((inq) => inq.id !== id);
    db.saveInquiries(filtered);
    res.json({
      success: true,
      message: 'Inquiry removed.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete inquiry.',
    });
  }
});

// Helper to derive initials if not provided
function deriveInitials(name) {
  if (!name || typeof name !== 'string') return 'TC';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase();
}

// GET /api/admin/team - Get all team members (active and inactive)
router.get('/team', requireAdmin, (req, res) => {
  try {
    const team = db.getTeamMembers();
    res.json({
      success: true,
      team,
    });
  } catch (err) {
    console.error('Admin get team error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve team members.',
    });
  }
});

// POST /api/admin/team - Add new team member
router.post('/team', requireAdmin, (req, res) => {
  try {
    const { name, role, initials, focusArea = '', imageUrl = '', isActive = true } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Team member name is required.',
      });
    }

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Team member role is required.',
      });
    }

    const calculatedInitials = initials && initials.trim() ? initials.trim().toUpperCase() : deriveInitials(name);

    const newMember = {
      id: `team-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      role: role.trim(),
      initials: calculatedInitials,
      focusArea: (focusArea || '').trim(),
      imageUrl: (imageUrl || '').trim(),
      isActive: Boolean(isActive),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const team = db.getTeamMembers();
    team.push(newMember);
    db.saveTeamMembers(team);

    res.status(201).json({
      success: true,
      member: newMember,
      message: 'Team member added successfully.',
    });
  } catch (err) {
    console.error('Admin add team member error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to add team member.',
    });
  }
});

// PUT /api/admin/team/:id - Update team member
router.put('/team/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const team = db.getTeamMembers();
    const index = team.findIndex((m) => m.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found.',
      });
    }

    const current = team[index];
    const { name, role, initials, focusArea, imageUrl, isActive } = req.body;

    const newName = name !== undefined ? String(name).trim() : current.name;
    const newInitials = initials !== undefined && initials.trim()
      ? initials.trim().toUpperCase()
      : (name !== undefined ? deriveInitials(newName) : current.initials);

    const updatedMember = {
      ...current,
      name: newName,
      role: role !== undefined ? String(role).trim() : current.role,
      initials: newInitials,
      focusArea: focusArea !== undefined ? String(focusArea).trim() : current.focusArea,
      imageUrl: imageUrl !== undefined ? String(imageUrl).trim() : current.imageUrl,
      isActive: isActive !== undefined ? Boolean(isActive) : current.isActive,
      updatedAt: new Date().toISOString(),
    };

    team[index] = updatedMember;
    db.saveTeamMembers(team);

    res.json({
      success: true,
      member: updatedMember,
      message: 'Team member updated successfully.',
    });
  } catch (err) {
    console.error('Admin update team member error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update team member.',
    });
  }
});

// DELETE /api/admin/team/:id - Delete team member
router.delete('/team/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const team = db.getTeamMembers();
    const filtered = team.filter((m) => m.id !== id);

    if (filtered.length === team.length) {
      return res.status(404).json({
        success: false,
        error: 'Team member not found.',
      });
    }

    db.saveTeamMembers(filtered);

    res.json({
      success: true,
      message: 'Team member removed successfully.',
    });
  } catch (err) {
    console.error('Admin delete team member error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete team member.',
    });
  }
});

export default router;
