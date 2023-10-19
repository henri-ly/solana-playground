import { readdirSync, readFileSync } from 'fs';
import { Idl, Solita } from '@metaplex-foundation/solita';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTypeScriptSDK() {
  console.error('Generating TypeScript SDK to sdk');

  const idlDir = path.join(__dirname, '../idl');
  const idlFiles = readdirSync(idlDir);

  for (const idlFile of idlFiles) {
    if (idlFile.endsWith('.json')) {
      const generatedIdlPath = `./idl/${idlFile}`;

      const idl: Idl = JSON.parse(readFileSync(generatedIdlPath, 'utf8'));
      const gen = new Solita(idl, { formatCode: true });
      const folder = `./sdk/${idlFile.slice(0, -5)}`;
      await gen.renderAndWriteTo(folder);
    }
  }

  console.error('Success!');

  process.exit(0);
}

generateTypeScriptSDK();
