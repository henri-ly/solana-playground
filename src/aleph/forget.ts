import { Keypair } from "@solana/web3.js";
import { Get } from "aleph-sdk-ts/dist/messages/post/index.js";
import { Publish as publishForget } from 'aleph-sdk-ts/dist/messages/forget/index.js';
import dotenv from 'dotenv';
import { SOLAccount } from "aleph-sdk-ts/dist/accounts/solana.js";
dotenv.config();

const secret = JSON.parse(process.env.secret || '');
if (secret === '') throw new Error("Secret not found in environment variables.");
const secretUint8Array = new Uint8Array(secret);
const signer = Keypair.fromSecretKey(secretUint8Array);

async function getItemHashes() {
    try {
      const response = await Get({
        types: 'Permission',
        pagination: 1,
        page: 1,
        hashes: [],
        APIServer: 'https://api2.aleph.im',
        addresses: [signer.publicKey.toString()]
      });
  
      return response.posts.map(post => post.item_hash)
    } catch (error) {
      console.error(error);
    }
}

async function forgetAll() {
    const hashes = await getItemHashes();
    if (!hashes) return
    await publishForget({
        channel: 'FISHNET_TEST_V1.14',
        hashes,
        APIServer: 'https://api2.aleph.im',
        account: new SOLAccount(signer.publicKey, signer)
    })
}

forgetAll()