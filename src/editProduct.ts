import { EditProductInstructionAccounts, EditProductInstructionArgs, createEditProductInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { USDC_MINT } from "./constants.js";
import dotenv from 'dotenv';
import BN from "bn.js";

dotenv.config();

async function editProduct() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const productPrice = new BN(1);
    const productPubkey = new PublicKey("3g4kaPCjSDSQWPzeRzAnSpNGo1vH3XXsTxeSKbNQh9bD");
    const accounts: EditProductInstructionAccounts = {
        signer: signer.publicKey,
        product: productPubkey,
        paymentMint: USDC_MINT,
    };
    console.log(accounts)
    const args: EditProductInstructionArgs = {
        productPrice: productPrice
    };
    const ix = createEditProductInstruction(accounts, args);
    let transaction = new Transaction().add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer);

    await connection.sendRawTransaction(transaction.serialize())
}
  
editProduct();