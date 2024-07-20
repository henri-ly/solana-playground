import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
export async function createProduct() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");
    const connection: Connection = new Connection(rpc);

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const config = {
        params: {
            signer: signer.publicKey.toString(),
            receiver: signer.publicKey.toString(),
        }
    };
    
    try {
        const response = await axios.get('http://127.0.0.1:3000/transaction/airdropAccess', config);
        console.log(response.data)
        const serializedBase64 = response.data.message
        const serializedBuffer = Buffer.from(serializedBase64, 'base64');

        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        transaction.sign([signer]);
        const txid = await connection.sendRawTransaction(transaction.serialize())
        console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
    } catch (error) {
        console.error('API Error:', error);
    }
}

createProduct()