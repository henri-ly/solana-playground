import dotenv from "dotenv";
import { Keypair, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";

dotenv.config();

export async function getRegisterBuyTransaction() {
    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);

    const datasetId = 'a8342dbc0c29843190dc4db03c795443d8aeefb5424e103792453d3ce7b546b3'
    const config = {
        datasetId,
        signer: signer.publicKey.toString(),
    };
    
    try {
        // Fetch prepared transaction
        const response = await axios.post('http://127.0.0.1:3001/solana/createTransaction', config, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const serializedBase64 = response.data.message;
        const serializedBuffer = Buffer.from(serializedBase64, 'base64');

        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        transaction.sign([signer]);
        const signedSerializedBase64 = Buffer.from(transaction.serialize()).toString('base64');

        // Send signed transaction to the server
        const sendResponse = await axios.post('http://127.0.0.1:3001/solana/sendTransaction', {
            datasetId,
            transaction: signedSerializedBase64,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Transaction Result:', sendResponse.data);
    } catch (error) {
        console.error('API Error:', error);
    }
}

getRegisterBuyTransaction();
