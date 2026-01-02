// dt5.js
const fs = require('fs');
const path = require('path');

/**
 * Reads a file using a stream and returns a Promise
 * @param {string} filePath - Path to the file
 */
function streamFile(filePath) {
  return new Promise((resolve, reject) => {
    // Create readable stream
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('data', chunk => {
      console.log(`Chunk received: ${chunk.length} chars`);
    });

    readStream.on('end', () => {
      console.log(`Finished reading file: ${filePath}\n`);
      resolve();
    });

    readStream.on('error', err => {
      console.error(`Stream error: ${err.message}`);
      reject(err);
    });
  });
}

// List of files to read (one exists, one does not)
const files = [
  path.join(__dirname, 'big.html'),    // Replace with a real file
  path.join(__dirname, 'nofile.html')  // Non-existent file to test error handling
];

(async () => {
  try {
    // Read all files in parallel
    await Promise.all(files.map(file => streamFile(file)));
    console.log('All files processed successfully');
  } catch (err) {
    console.error('Caught error:', err.message);
  }
})();
