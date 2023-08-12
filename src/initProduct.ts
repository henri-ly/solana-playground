import { InitProductInstructionAccounts, InitProductInstructionArgs, createInitProductInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { BRICK_PROGRAM_ID_PK, USDC_MINT } from "./constants.js";
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';
import BN from "bn.js";

dotenv.config();

async function initProduct() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const marketplacePubkey = new PublicKey('5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG');
    const productPrice = new BN(10000);
    const [firstId, secondId] = getSplitId(uuid());
    const [accessMint] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("access_mint", "utf-8"),
          marketplacePubkey.toBuffer(),
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [productPubkey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("product", "utf-8"), 
          firstId, 
          secondId,
          marketplacePubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [productMint, mintBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("product_mint", "utf-8"), 
            productPubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const accessVault = getAssociatedTokenAddressSync(accessMint, signer.publicKey, false, TOKEN_2022_PROGRAM_ID);
    const accounts: InitProductInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        tokenProgram2022: TOKEN_2022_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        product: productPubkey,
        productMint: productMint,
        paymentMint: USDC_MINT,
        accessMint: accessMint,
        accessVault: accessVault,
    };
    const args: InitProductInstructionArgs = {
        params: {
            firstId: [...firstId],
            secondId: [...secondId],
            productPrice: productPrice,
            productMintBump: mintBump,
        }
    };
    const ix = createInitProductInstruction(accounts, args);
    let transaction = new Transaction().add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer);

    await connection.sendRawTransaction(transaction.serialize())
}

function getSplitId(str: string): [Buffer, Buffer]{
    const bytes = new TextEncoder().encode(str);
  
    const data = new Uint8Array(64);
    data.fill(32);
    data.set(bytes);
  
    const firstId = Buffer.from(data.slice(0, 32));
    const secondId = Buffer.from(data.slice(32));
  
    return [firstId, secondId];
}
  
initProduct();