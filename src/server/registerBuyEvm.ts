import dotenv from "dotenv";
import { ethers } from "ethers";
import axios from "axios";
import { ethereumNetworkConfig } from '../evmConfig.js';

dotenv.config();

export async function testEvmEndpoints() {
    const privateKey = process.env.eth_secret;
    if (!privateKey) throw new Error("Private key not found in environment variables.");

    const wallet = new ethers.Wallet(privateKey);
    const blockchain = 'avalanche';
    const datasetId = 'a8342dbc0c29843190dc4db03c795443d8aeefb5424e103792453d3ce7b546b3';

    const config = {
        blockchain,
        datasetId,
        signer: wallet.address,
    };
    
    try {
        const response = await axios.get('http://127.0.0.1:3001/evm/createTransaction', {
            params: config,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const transactionData = JSON.parse(response.data.transaction);
        const tx = {
            to: transactionData.plain.recipients[0],
            value: ethers.utils.parseUnits(transactionData.plain.amount, 'wei'),
            gasLimit: ethers.BigNumber.from(transactionData.plain.gas),
            nonce: ethers.BigNumber.from(transactionData.plain.nonce),
            chainId: ethereumNetworkConfig[blockchain],
            data: transactionData.plain.data || '0x',
        };
        console.log(config)
        const signature = await wallet.signTransaction(tx);

        const sendTransactionParams = {
            blockchain,
            datasetId,
            transaction: JSON.stringify(transactionData.plain),
            encodedTransaction: JSON.stringify(transactionData.encoded),
            signature,
        };
        console.log(sendTransactionParams)

        const sendResponse = await axios.post('http://127.0.0.1:3001/evm/sendTransaction', sendTransactionParams, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Transaction Result:', sendResponse.data);
    } catch (error) {
        console.error('API Error:', error);
    }
}

testEvmEndpoints();
