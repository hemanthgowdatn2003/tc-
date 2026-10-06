import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

console.log('🚀 Deploying dist folder to GitHub Pages (gh-pages branch)...');

const remoteUrl = execSync('git config --get remote.origin.url', { cwd: rootDir }).toString().trim();
if (!remoteUrl) {
  console.error('❌ Could not find remote origin URL.');
  process.exit(1);
}

const gitDirInDist = path.join(distDir, '.git');
if (fs.existsSync(gitDirInDist)) {
  fs.rmSync(gitDirInDist, { recursive: true, force: true });
}

execSync('git init', { cwd: distDir, stdio: 'inherit' });
execSync('git checkout -B gh-pages', { cwd: distDir, stdio: 'inherit' });
execSync('git add -A', { cwd: distDir, stdio: 'inherit' });
execSync('git commit -m "Deploy to GitHub Pages"', { cwd: distDir, stdio: 'inherit' });
execSync(`git remote add origin "${remoteUrl}"`, { cwd: distDir, stdio: 'inherit' });
execSync('git push -f origin gh-pages', { cwd: distDir, stdio: 'inherit' });

fs.rmSync(gitDirInDist, { recursive: true, force: true });
console.log('✅ Successfully published to gh-pages branch!');
