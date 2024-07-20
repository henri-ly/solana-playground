import { Keypair } from "@solana/web3.js";
import axios from "axios";
import bs58 from "bs58";
import nacl from "tweetnacl";
import dotenv from "dotenv";
import { SigninMessage } from "../utils/sigInMessage.js";

dotenv.config();

const secret = process.env.secret;
if (!secret) throw new Error("Secret not found in environment variables.");
const secretUint8Array = new Uint8Array(JSON.parse(secret));
const signer = Keypair.fromSecretKey(secretUint8Array);

// Function to sign a message with the secret key
const signMessage = (messageBytes: Uint8Array, secretKey: Uint8Array) => {
    return nacl.sign.detached(messageBytes, secretKey);
};

// Test the /nonce endpoint
const testNonceEndpoint = async () => {
    try {
        const response = await axios.post('http://localhost:3000/auth/nonce', { address: signer.publicKey.toString() });
        console.log('Nonce Response:', response.data);
        return response.data.nonce; // Assuming the nonce is returned in nonce field
    } catch (error: any) {
        console.error('Error testing /nonce endpoint:', error.response ? error.response.data : error.message);
    }
};

// Test the /login endpoint
const testLoginEndpoint = async (nonce: string) => {
    try {
        const message = new SigninMessage({
            publicKey: signer.publicKey.toBase58(),
            statement: `Sign in.`,
            nonce: nonce,
        });

        const data = new TextEncoder().encode(message.prepare());
        const signature = signMessage(data, signer.secretKey);
        const serializedSignature = bs58.encode(signature);

        const response = await axios.post('http://localhost:3000/auth/login', {
            message: JSON.stringify(message),
            signature: serializedSignature
        });
        console.log('Login Response:', response.data);
        return response.data.token; // Assuming the token is returned in token field
    } catch (error: any) {
        console.error('Error testing /login endpoint:', error.response ? error.response.data : error.message);
    }
};

// Test a protected endpoint
const testProtectedEndpoint = async (token: string) => {
    try {
        const response = await axios.post('http://localhost:3000/market/create', { name: 'test', user: signer.publicKey.toBase58() }, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('Protected Endpoint Response:', response.data);
    } catch (error: any) {
        console.error('Error testing protected endpoint:', error.response ? error.response.data : error.message);
    }
};

// Main function to orchestrate the testing
const main = async () => {
    const nonce = await testNonceEndpoint();
    if (nonce) {
        const token = await testLoginEndpoint(nonce);
        if (token) {
            await testProtectedEndpoint(token);
        }
    }
};

main();
