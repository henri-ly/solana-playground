import { Connection } from '@solana/web3.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { IX_DATA_LAYOUT, InstructionType } from './utils/solita/brick/instructions.js';
dotenv.config();

async function getAccesses() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const connection: Connection = new Connection(rpc);

    const headers = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const requestOwnerData = {
        jsonrpc: '2.0',
        id: 'searchAssets',
        method: 'searchAssets',
        params: {
            ownerAddress: 'fisherH6SRzYVd2JE53Kgiax9R9MmtS95TC8ERPr3D7',
            compressed: true,
            // product mint = collection
            grouping: ["collection", "FuzwPRVgY9TAgJR5KY58hDb9D4Y3VfNFYHfsW3gDMyJW"],
            page: 1,
            limit: 1000
        },
    };
    
    const assetIds: string[]  = [];
    try {
        const response = await axios.post(rpc, requestOwnerData, headers);
        console.log('API Response:', response.data);
        
        // Store all asset IDs in the array
        response.data.result.items.forEach((item: { id: string; }) => {
            assetIds.push(item.id);
        });
    } catch (error) {
        console.error('API Error:', error);
    }
    
    // Fetch signatures for each asset ID and process the transaction
    let unitsPurchased = 0;
    for (const assetId of assetIds) {
        const requestSignaturesData = {
            jsonrpc: '2.0',
            id: 'brick',
            method: 'getSignaturesForAsset',
            params: {
                id: assetId,
                page: 1,
                limit: 1000
            },
        };

        try {
            const response = await axios.post(rpc, requestSignaturesData, headers);
            console.log('API Response:', response.data.result.items);

            // Process the transaction: all assets, must have an unique signature
            const tx = await connection.getTransaction(response.data.result.items[0][0], {commitment: 'confirmed', maxSupportedTransactionVersion: 1});
            if (tx && tx.meta && tx.meta.innerInstructions) {
                try {
                    const [context] = IX_DATA_LAYOUT[InstructionType.RegisterBuyCnft].deserialize(tx.transaction.message.compiledInstructions[1].data);
                    const { instructionDiscriminator, ...result } = context;
                    unitsPurchased =+ result.params.amount; 
                } catch (e) {
                    console.error(e);
                }
            }
        } catch (error) {
            console.error('API Error:', error);
        }
        console.log("Units purchased: " + unitsPurchased);
    }
}

getAccesses();