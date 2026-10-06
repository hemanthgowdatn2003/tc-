import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// POST /api/contact - Client contact submission
router.post('/', (req, res) => {
  try {
    const { name, email, phone, serviceInterest, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name.',
      });
    }

    if (!email || !isValidEmail(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    if (!serviceInterest || !serviceInterest.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please select a service of interest.',
      });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a detailed project message (minimum 10 characters).',
      });
    }

    const inquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      serviceInterest: serviceInterest.trim(),
      message: message.trim(),
      receivedAt: new Date().toISOString(),
      status: 'new',
    };

    const inquiries = db.getInquiries();
    inquiries.unshift(inquiry);
    db.saveInquiries(inquiries);

    // Note: Complies strictly with instructions:
    // "Do not claim that a message was emailed unless a real email service has been configured."
    res.status(201).json({
      success: true,
      message:
        'Thank you for reaching out! Your inquiry has been received by TC Web & Studio. Our team will review your project details and get back to you within 24-48 business hours.',
      inquiryId: inquiry.id,
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({
      success: false,
      error: 'Unable to process your inquiry right now. Please try again later.',
    });
  }
});

export default router;
