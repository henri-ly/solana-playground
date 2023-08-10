import { Idl, Solita } from '@metaplex-foundation/solita';
import { readFileSync } from 'fs'
import { writeFile } from 'fs/promises';

const PROGRAM_NAME = 'aleph_solana_contract';
const PROGRAM_ID = 'ALepH1n9jxScbz45aZhBYVa35zxBNbKSvL6rWQpb4snc';
const generatedSDKDir = 'generated';

async function generateTypeScriptSDK() {
  console.error('Generating TypeScript SDK to %s', generatedSDKDir);
  const generatedIdlPath = `./idl/${PROGRAM_NAME}.json`;

  const idl: Idl = JSON.parse(readFileSync(generatedIdlPath, 'utf8'));
  if (idl.metadata?.address == null) {
    idl.metadata = { ...idl.metadata, address: PROGRAM_ID };
    await writeFile(generatedIdlPath, JSON.stringify(idl, null, 2));
  }
  const gen = new Solita(idl, { formatCode: true });
  await gen.renderAndWriteTo(generatedSDKDir);

  console.error('Success!');

  process.exit(0);
}

generateTypeScriptSDK()
