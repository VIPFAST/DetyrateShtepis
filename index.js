const fs = require('fs');
const path = require('path');

async function main() {
  try {
   
    const envPath = path.join(__dirname, '.env');
    const envContent = await fs.promises.readFile(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eq = trimmed.indexOf('=');
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    });

    const message = process.env.MESSAGE;
    if (typeof message === 'undefined') {
      console.error('No MESSAGE found in .env');
      process.exit(1);
    }

    const dataDir = path.join(__dirname, 'data');
    await fs.promises.mkdir(dataDir, { recursive: true });

    const filePath = path.join(dataDir, 'message.txt');
    await fs.promises.writeFile(filePath, message, 'utf8');

    const read = await fs.promises.readFile(filePath, 'utf8');
    console.log(read);

    await fs.promises.unlink(filePath);
    await fs.promises.rmdir(dataDir);

    console.log('Done: Mesazhi u Shkrua, dul ne terminal , file u fshi, follderi u fshi.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
