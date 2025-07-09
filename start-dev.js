import { spawn } from 'child_process';
import path from 'path';

const clientDir = path.resolve(process.cwd(), 'client');

// Start Vite dev server
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  cwd: clientDir,
  stdio: 'inherit',
  shell: true
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
});

vite.on('exit', (code) => {
  console.log(`Vite process exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  vite.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down...');
  vite.kill('SIGTERM');
  process.exit(0);
});