import { Connection, Keypair } from "@solana/web3.js";
import { FNET_MINT } from "../constants.js";
import dotenv from 'dotenv';
import { createInitMarketplaceTransaction } from "brick-protocol";
dotenv.config();

async function initMarketplace() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const accounts = {
        signer: signer.publicKey,
        rewardMint: FNET_MINT,
        discountMint: FNET_MINT,
    };
    const args = {
        fee: 100,
        feeReduction: 20,
        sellerReward: 10,
        buyerReward: 10,
        useCnfts: true,
        deliverToken: false,
        transferable: false,
        chainCounter: false,
        permissionless: false,
        rewardsEnabled: false,
        feePayer: 0,
    };

    const transaction = await createInitMarketplaceTransaction(connection, accounts, args);
    transaction.sign([signer]);
    console.log(transaction)
    const txid = await connection.sendTransaction(transaction);
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
}

initMarketplace();