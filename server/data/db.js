import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = __dirname;

const PACKAGES_FILE = path.join(DATA_DIR, 'packages.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

function readJsonFile(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filePath, defaultValue);
      return defaultValue;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJsonFile(filePath, data) {
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch (_) {}
    }
    throw err;
  }
}

export const db = {
  getPackages() {
    return readJsonFile(PACKAGES_FILE, []);
  },
  savePackages(packages) {
    writeJsonFile(PACKAGES_FILE, packages);
  },
  getSettings() {
    return readJsonFile(SETTINGS_FILE, {
      instagramUrl: '',
      contactEmail: 'contact@tcwebstudio.com',
      contactPhone: '+91 98765 43210',
      agencyName: 'TC Web & Studio',
      tagline: 'Creative Digital Services Agency',
    });
  },
  saveSettings(settings) {
    writeJsonFile(SETTINGS_FILE, settings);
  },
  getInquiries() {
    return readJsonFile(INQUIRIES_FILE, []);
  },
  saveInquiries(inquiries) {
    writeJsonFile(INQUIRIES_FILE, inquiries);
  },
};
