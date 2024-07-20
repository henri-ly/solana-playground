import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
import { parse, stringify, v4 as uuid } from "uuid";

const createProduct = async () => {
    const url = 'http://127.0.0.1:3000/product/create';
    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const productData = {
        seller: signer.publicKey,
        market: uuid(),
        mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        price: 1,
    };

    try {
        const response = await axios.post(url, productData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Product creation response:', response.data);
    } catch (error: any) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
};

createProduct();
