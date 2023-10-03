import { Metaplex, keypairIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { Connection, Keypair } from "@solana/web3.js";

const rpc = process.env.rpc || '';
const secret = JSON.parse(process.env.secret || '');
const secretUint8Array = new Uint8Array(secret);
const signer = Keypair.fromSecretKey(secretUint8Array);

const metaplex = new Metaplex(new Connection(rpc))
    .use(keypairIdentity(signer))
    .use(bundlrStorage({ address: 'https://devnet.bundlr.netowrk' }));
    /// mainnet bundlr https://node1.bundlr.netowrk

export const bundlr = metaplex.storage();