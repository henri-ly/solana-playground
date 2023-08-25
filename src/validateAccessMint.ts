import { AccountLayout, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
dotenv.config();

export async function validateAccessMint() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");
    const connection: Connection = new Connection(rpc);

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    
    try {
        const accessMint = new PublicKey("HtMwVvqCCbaqkLErWVgYPJbTwpRbe9WYzmWA4GQKbpXP");
        const accessVault = getAssociatedTokenAddressSync(accessMint, signer.publicKey, false, TOKEN_2022_PROGRAM_ID);
        console.log(accessVault)
        const accountInfo = await connection.getAccountInfo(accessVault)
        if (accountInfo && accountInfo.data){
            const accountData = AccountLayout.decode(accountInfo.data)
            console.log(accountData)
        }
    } catch (error) {
        console.error('API Error:', error);
    }
}
validateAccessMint();
