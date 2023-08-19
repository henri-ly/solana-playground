import { getAccesses } from "brick-protocol"
import dotenv from 'dotenv';
dotenv.config();

async function queryAccess() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const productMint = 'FuzwPRVgY9TAgJR5KY58hDb9D4Y3VfNFYHfsW3gDMyJW';
    const owner = 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7';
    const accessesPurchased = await getAccesses(rpc, owner, productMint)
    console.log(accessesPurchased)
}

queryAccess();