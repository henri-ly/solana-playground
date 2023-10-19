import { createInitProductTreeTransaction } from "../../../brick/ts-sdk/dist/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram } from "@solana/web3.js";
import { BRICK_PROGRAM_ID_PK, BUBBLEGUM_PROGRAM_ID_PK, COMPRESSION_PROGRAM_ID_PK, METADATA_PROGRAM_ID_PK, NOOP_PROGRAM_ID_PK, USDC_MINT } from "../constants.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';

dotenv.config();

async function initProductTree() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.thirdSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const marketplacePubkey = new PublicKey('5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG');
    const productPrice = 1000;
    const [firstId, secondId] = getSplitId(uuid());
    const accessMint = new PublicKey("HtMwVvqCCbaqkLErWVgYPJbTwpRbe9WYzmWA4GQKbpXP");
    const [productPubkey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("product", "utf-8"), 
          firstId, 
          secondId,
          marketplacePubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [productMint] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("product_mint", "utf-8"), 
          productPubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [masterEdition] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata", "utf-8"),
            METADATA_PROGRAM_ID_PK.toBuffer(),
            productMint.toBuffer(),
            Buffer.from("edition", "utf-8"),
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [metadata] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata", "utf-8"),
            METADATA_PROGRAM_ID_PK.toBuffer(),
            productMint.toBuffer(),
        ],
        METADATA_PROGRAM_ID_PK
    );
    const merkleTree = Keypair.generate();
    const [treeAuthority] = PublicKey.findProgramAddressSync(
        [merkleTree.publicKey.toBuffer()], BUBBLEGUM_PROGRAM_ID_PK
    );
    const accounts = {
        tokenMetadataProgram:  METADATA_PROGRAM_ID_PK,
        logWrapper: NOOP_PROGRAM_ID_PK,
        systemProgram: SystemProgram.programId,
        bubblegumProgram: BUBBLEGUM_PROGRAM_ID_PK,
        compressionProgram: COMPRESSION_PROGRAM_ID_PK,
        tokenProgramV0: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        product: productPubkey,
        productMint: productMint,
        paymentMint: USDC_MINT,
        accessMint: accessMint,
        accessVault: null,
        productMintVault: getAssociatedTokenAddressSync(productMint, productPubkey, true),
        masterEdition: masterEdition,
        metadata: metadata,
        merkleTree: merkleTree.publicKey,
        treeAuthority: treeAuthority,
    };
    const [height, buffer, canopy] = [5, 8, 0];    
    const params = {
        id: uuid(),
        feeBasisPoints: 0,
        height,
        buffer,
        canopy,
        productPrice: productPrice,
        name: "DATASET",
        metadataUrl: "test",
    };
    const tx = await createInitProductTreeTransaction(connection, accounts, params);
    tx.sign([signer]);
    const sig = await connection.sendRawTransaction(tx.serialize())
    console.log(sig)
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
  
initProductTree();