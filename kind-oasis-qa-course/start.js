#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🌿 Starting Kind Oasis QA Course...');
console.log('📖 Interactive Manufacturing Quality Assurance Training');
console.log('');

// Start the development server
const child = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Error starting the application:', error.message);
  console.log('💡 Make sure you have Node.js installed and run: npm install');
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.log(`\n❌ Application exited with code ${code}`);
  } else {
    console.log('\n✅ Application stopped successfully');
  }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  child.kill('SIGTERM');
});