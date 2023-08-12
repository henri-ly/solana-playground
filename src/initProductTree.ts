import { InitProductTreeInstructionAccounts, InitProductTreeInstructionArgs, createInitProductTreeInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { BRICK_PROGRAM_ID_PK, BUBBLEGUM_PROGRAM_ID_PK, COMPRESSION_PROGRAM_ID_PK, METADATA_PROGRAM_ID_PK, NOOP_PROGRAM_ID_PK, USDC_MINT } from "./constants.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { getConcurrentMerkleTreeAccountSize } from "@solana/spl-account-compression";
import { v4 as uuid } from "uuid";
import dotenv from 'dotenv';
import BN from "bn.js";

dotenv.config();

async function initProductTree() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const marketplacePubkey = new PublicKey('5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG');
    const productPrice = new BN(10000);
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
    const accessVault = new PublicKey("Bv1NYHa5BBFwmcoyrxkWP6fmg142L72dCs1bckH9Wi7P");
    const accounts: InitProductTreeInstructionAccounts = {
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
        accessVault: accessVault,
        productMintVault: getAssociatedTokenAddressSync(productMint, productPubkey, true),
        masterEdition: masterEdition,
        metadata: metadata,
        merkleTree: merkleTree.publicKey,
        treeAuthority: treeAuthority,
    };
    const [height, buffer, canopy] = [5, 8, 0];
    const space = getConcurrentMerkleTreeAccountSize(height, buffer, canopy);
    const cost = await connection.getMinimumBalanceForRentExemption(space);
    
    const args: InitProductTreeInstructionArgs = {
        params: {
            firstId: [...firstId],
            secondId: [...secondId],
            productPrice: productPrice,
            maxDepth: height,
            maxBufferSize: buffer,
            name: "DATASET",
            metadataUrl: "test",
            feeBasisPoints: 0,
        }
    };
    const ix = createInitProductTreeInstruction(accounts, args);
    let transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: signer.publicKey,
            newAccountPubkey: merkleTree.publicKey,
            lamports: cost,
            space: space,
            programId: COMPRESSION_PROGRAM_ID_PK,
        }),
    ).add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer, merkleTree);

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
  
initProductTree();