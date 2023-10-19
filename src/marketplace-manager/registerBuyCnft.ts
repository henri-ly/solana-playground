import { USDC_MINT } from "../constants.js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';
import { createRegisterBuyCnftTransaction } from "../../../brick/ts-sdk/dist/index.js"

dotenv.config();

async function registerBuyCnft() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);
    const marketplace = new PublicKey('5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG');
    const product = new PublicKey("3g4kaPCjSDSQWPzeRzAnSpNGo1vH3XXsTxeSKbNQh9bD");
    const seller = new PublicKey("rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR");
    const marketplaceAuth = new PublicKey("fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7");
    const merkleTree = new PublicKey("HvAkTeUcFcxrGSVfSN4yoXrS8MBRMkuS3Q7hWXpCnCZV");
    const accounts = {
        signer: signer.publicKey,
        marketplace,
        product,
        seller,
        marketplaceAuth,
        paymentMint: USDC_MINT,
        merkleTree
    };
    const params = {
        rewardsActive: false,
        amount: 1000,
        name: "cNFT name",
        uri: "cNFT uri",
    };
    const transaction = await createRegisterBuyCnftTransaction(connection, accounts, params);
    transaction.sign([signer]);
    console.log(transaction)
    const txid = await connection.sendTransaction(transaction);
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
}
  
registerBuyCnft();