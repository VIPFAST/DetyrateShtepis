// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE = path.join(__dirname, 'big.html');

const server = http.createServer((req, res) => {
  const readStream = fs.createReadStream(FILE);

  readStream.on('error', err => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('File not found');
  });

  res.writeHead(200, { 'Content-Type': 'text/html' });
  readStream.pipe(res); // stream the file to client
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
