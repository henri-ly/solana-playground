import { getConcurrentMerkleTreeAccountSize } from "@solana/spl-account-compression";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import dotenv from 'dotenv';
dotenv.config();

async function getTreeCost () {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const connection: Connection = new Connection(rpc);
    
    const [height, buffer, canopy] = [14, 16, 0];
    const space = getConcurrentMerkleTreeAccountSize(height, buffer, canopy);
    const cost = await connection.getMinimumBalanceForRentExemption(space);
    console.log('Max cNFTs: ' + Math.pow(2, height) + ' Cost: ' + cost / LAMPORTS_PER_SOL)
}

getTreeCost();