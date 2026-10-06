import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../uploads');

// Ensure directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Allowed MIME types and extensions
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
]);

const ALLOWED_EXTENSIONS = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp']);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 50);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_MIME_TYPES.has(file.mimetype) || !ALLOWED_EXTENSIONS.has(ext)) {
    return cb(
      new Error(
        'Invalid file type. Only PDF, JPG, JPEG, PNG, and WEBP files are allowed.'
      ),
      false
    );
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max limit
    files: 1,
  },
  fileFilter,
});

// POST /api/admin/upload - Protected single file upload
router.post(
  '/upload',
  requireAdmin,
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            error: 'File size exceeds maximum limit of 10MB.',
          });
        }
        return res.status(400).json({
          success: false,
          error: `Upload error: ${err.message}`,
        });
      } else if (err) {
        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }
      next();
    });
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file was provided.',
      });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    const isPdf = req.file.mimetype === 'application/pdf';

    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: fileUrl,
        isPdf,
        uploadedAt: new Date().toISOString(),
      },
      message: 'File uploaded successfully.',
    });
  }
);

// GET /api/admin/uploads - List uploaded files
router.get('/uploads', requireAdmin, (req, res) => {
  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    const fileList = files
      .filter((file) => !file.startsWith('.') && file !== '.gitkeep')
      .map((fileName) => {
        const filePath = path.join(UPLOADS_DIR, fileName);
        const stats = fs.statSync(filePath);
        const ext = path.extname(fileName).toLowerCase();
        return {
          filename: fileName,
          url: `/uploads/${fileName}`,
          size: stats.size,
          createdAt: stats.birthtime,
          isPdf: ext === '.pdf',
          isImage: ['.jpg', '.jpeg', '.png', '.webp'].includes(ext),
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      files: fileList,
    });
  } catch (err) {
    console.error('List uploads error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve uploaded files.',
    });
  }
});

// DELETE /api/admin/uploads/:filename - Protected delete
router.delete('/uploads/:filename', requireAdmin, (req, res) => {
  try {
    const { filename } = req.params;
    // Security check: prevent directory traversal
    const safeFilename = path.basename(filename);
    const targetPath = path.join(UPLOADS_DIR, safeFilename);

    if (!fs.existsSync(targetPath)) {
      return res.status(404).json({
        success: false,
        error: 'File does not exist.',
      });
    }

    fs.unlinkSync(targetPath);

    res.json({
      success: true,
      message: 'File removed successfully.',
    });
  } catch (err) {
    console.error('Delete upload error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to remove file.',
    });
  }
});

export default router;
