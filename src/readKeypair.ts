import { Keypair } from "@solana/web3.js";

function readKeypair(): Keypair | null {
  try {
    // include the Uint8Array  
    const keypair = Keypair.fromSecretKey(new Uint8Array([]));
    
    return keypair;
  } catch (error) {
    console.error("Error reading or parsing the keypair:", error);
    return null;
  }
}

const keypair = readKeypair();

if (keypair) {
  console.log("PublicKey", keypair.publicKey);
} else {
  console.error("Failed to create the keypair.");
}
