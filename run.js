const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getScreenshot = args.includes('--screenshot') || (!args.includes('--trace'));
const getTrace = args.includes('--trace');

// Handle output folder configuration
let outputDir = path.join(__dirname, 'output'); // Default
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' || args[i] === '-o') {
    if (args[i + 1] && !args[i + 1].startsWith('--')) {
      outputDir = path.resolve(args[i + 1]);
      break;
    }
  }
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Output directory: ${outputDir}`);

// Start wrangler in the background
console.log('Starting wrangler...');
const wrangler = require('child_process').spawn('npx', ['wrangler', 'dev', '--remote'], {
  detached: true
});

// Give wrangler time to start
setTimeout(() => {
  try {
    if (getScreenshot) {
      console.log('Getting screenshot...');
      execSync(`curl "http://localhost:8787/" -o ${path.join(outputDir, 'screenshot.png')}`);
      console.log(`Screenshot saved to ${path.join(outputDir, 'screenshot.png')}`);
    }
    
    if (getTrace) {
      console.log('Getting trace...');
      execSync(`curl "http://localhost:8787/?trace=1" -o ${path.join(outputDir, 'trace.zip')}`);
      console.log(`Trace saved to ${path.join(outputDir, 'trace.zip')}`);
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    // Kill wrangler process
    console.log('Terminating wrangler...');
    process.platform === 'win32' ? 
      execSync(`taskkill /PID ${wrangler.pid} /F /T`) : 
      process.kill(-wrangler.pid);
    
    console.log('Done!');
    process.exit(0);
  }
}, 5000); // Wait 5 seconds for wrangler to start