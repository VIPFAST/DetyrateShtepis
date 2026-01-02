const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const fileIndex = args.indexOf('-f');
const contentIndex = args.indexOf('-c');

if (fileIndex === -1 || contentIndex === -1) {
  console.log('Usage: node writeCmdFile.js -f <File_name> -c <CONTENT>');
  process.exit(1);
}

const fileName = args[fileIndex + 1];
const content = args[contentIndex + 1];

const filePath = path.resolve(fileName);

fs.stat(filePath, (err) => {
  if (err) {
    fs.writeFile(filePath, content + '\n', (err) => {
      if (err) throw err;
      console.log('File created and content written.');
    });
  } else {
    fs.appendFile(filePath, content + '\n', (err) => {
      if (err) throw err;
      console.log('Content appended to file.');
    });
  }
});
