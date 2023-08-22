import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export async function getProductTransaction() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");
    const connection: Connection = new Connection(rpc);

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const config = {
        params: {
            signer: signer.publicKey, 
            marketplace: '5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG', 
            paymentMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 
            params: {
                id: 'euwfhieowfjkewmnfwkjmnfkaaaa',
                productPrice: 1,
                feeBasisPoints: 1,
                height: 15,
                buffer: 8,
                canopy: 0,
            }
        }
    };
    
    try {
        const response = await axios.get('http://localhost:8887/initProductTree', config);
        console.log(response.data.transaction)
        const serializedBase64 = response.data.transaction
        const serializedBuffer = Buffer.from(serializedBase64, 'base64');

        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        transaction.sign([signer]);
        const txid = await connection.sendRawTransaction(transaction.serialize())
        console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
    } catch (error) {
        console.error('API Error:', error);
    }
}

getProductTransaction();

export async function queryPurchases() {
    const config = {
        params: {
            ownerAddress: 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7', 
            productMint: 'FuzwPRVgY9TAgJR5KY58hDb9D4Y3VfNFYHfsW3gDMyJW', 
        }
    };

    const startTime = performance.now();

    try {
        const response = await axios.get('http://localhost:8887/queryPurchases', config);
        const endTime = performance.now();
        
        console.log(response.data);
        console.log(`Time taken: ${endTime - startTime} milliseconds`);
    } catch (error) {
        console.error('API Error:', error);
    }
}

//queryPurchases();
export async function getRegisterBuyTransaction() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");
    const connection: Connection = new Connection(rpc);

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    console.log(signer.publicKey)
    const config = {
        params: {
            signer: signer.publicKey, 
            marketplace: '5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG', 
            productId: '12f69588079d2b3ffa314988fad350d6c3e8ff2b84a6840d41f12280ebcde9db',
            paymentMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 
            seller: signer.publicKey,
            marketplaceAuth: 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7',
            params: {
                rewardsActive: 'false',
                amount: '1',
                name: "Invoice",
            }
        }
    };
    
    try {
        const response = await axios.get('http://localhost:8887/registerBuy', config);
        console.log(response.data)
        const serializedBase64 = response.data.transaction
        const serializedBuffer = Buffer.from(serializedBase64, 'base64');

        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        transaction.sign([signer]);
        const txid = await connection.sendRawTransaction(transaction.serialize())
        console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
    } catch (error) {
        console.error('API Error:', error);
    }
}
//getRegisterBuyTransaction();

export async function getProductInitTreeTxn() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");
    const connection: Connection = new Connection(rpc);

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");
    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);

    const config = {
        params: {
            signer: signer.publicKey, 
            marketplace: '5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG', 
            paymentMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 
            params: {
                id: 'jbfouahkajsd',
                productPrice: 1,
                feeBasisPoints: 1,
                height: 5,
                buffer: 8,
                canopy: 0,
            }
        }
    };
    
    try {
        const response = await axios.get('http://localhost:8887/initProductTree', config);
        console.log(response.data)
        const serializedBase64 = response.data.transaction
        const serializedBuffer = Buffer.from(serializedBase64, 'base64');

        const transaction = VersionedTransaction.deserialize(serializedBuffer);
        transaction.sign([signer]);
        const txid = await connection.sendRawTransaction(transaction.serialize())
        console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
    } catch (error) {
        console.error('API Error:', error);
    }
}
//getProductInitTreeTxn();
