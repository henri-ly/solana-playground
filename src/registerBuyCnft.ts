import { BRICK_PROGRAM_ID_PK, BUBBLEGUM_PROGRAM_ID_PK, COMPRESSION_PROGRAM_ID_PK, METADATA_PROGRAM_ID_PK, NOOP_PROGRAM_ID_PK, USDC_MINT } from "./constants.js";
import { RegisterBuyCnftInstructionAccounts, RegisterBuyCnftInstructionArgs, createRegisterBuyCnftInstruction } from "./utils/solita/brick/index.js";
import { ComputeBudgetProgram, Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import dotenv from 'dotenv';

dotenv.config();

async function initProductTree() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const marketplacePubkey = new PublicKey('5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG');
    const productPubkey = new PublicKey("3g4kaPCjSDSQWPzeRzAnSpNGo1vH3XXsTxeSKbNQh9bD");
    const seller = new PublicKey("rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR");
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
    const merkleTree = new PublicKey("HvAkTeUcFcxrGSVfSN4yoXrS8MBRMkuS3Q7hWXpCnCZV");
    const [treeAuthority] = PublicKey.findProgramAddressSync(
        [merkleTree.toBuffer()], BUBBLEGUM_PROGRAM_ID_PK
    );
    const [bubblegumSigner] = PublicKey.findProgramAddressSync(
        [Buffer.from("collection_cpi", "utf-8")], BUBBLEGUM_PROGRAM_ID_PK
    );
    /*const [sellerReward] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("reward", "utf-8"), 
          seller.toBuffer(),
          marketplacePubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [sellerRewardVault] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("reward_vault", "utf-8"), 
          seller.toBuffer(),
          marketplacePubkey.toBuffer(),
          FNET_MINT.toBuffer(),
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [buyerReward] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("reward", "utf-8"), 
          signer.publicKey.toBuffer(),
          marketplacePubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [buyerRewardVault] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("reward_vault", "utf-8"), 
          signer.publicKey.toBuffer(),
          marketplacePubkey.toBuffer(),
          FNET_MINT.toBuffer(),
        ],
        BRICK_PROGRAM_ID_PK
    );*/
    const accounts: RegisterBuyCnftInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        tokenProgramV0: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        logWrapper: NOOP_PROGRAM_ID_PK,
        bubblegumProgram: BUBBLEGUM_PROGRAM_ID_PK,
        compressionProgram: COMPRESSION_PROGRAM_ID_PK,
        tokenMetadataProgram:  METADATA_PROGRAM_ID_PK,
        signer: signer.publicKey,
        seller: null,
        marketplaceAuth: null,
        marketplace: marketplacePubkey,
        product: productPubkey,
        paymentMint: USDC_MINT,
        productMint: productMint,
        buyerTransferVault: (await getOrCreateAssociatedTokenAccount(connection, signer, USDC_MINT, signer.publicKey)).address,
        sellerTransferVault: (await getOrCreateAssociatedTokenAccount(connection, signer, USDC_MINT, seller)).address,
        marketplaceTransferVault: (await getOrCreateAssociatedTokenAccount(connection, signer, USDC_MINT, signer.publicKey)).address,
        bountyVault: null,
        sellerReward: null,
        sellerRewardVault: null,
        buyerReward: null,
        buyerRewardVault: null,
        metadata: metadata,
        masterEdition: masterEdition,
        treeAuthority: treeAuthority,
        bubblegumSigner: bubblegumSigner,
        merkleTree: merkleTree,
    };
    const args: RegisterBuyCnftInstructionArgs = {
        params: {
            amount: 1000,
            name: "DATASET",
            symbol: "BRICK",
            uri: "test",
        }
    };
    const increaseLimitIx = ComputeBudgetProgram.setComputeUnitLimit({ units: 350000 });
    const registerBuyIx = createRegisterBuyCnftInstruction(accounts, args);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    const messageV0 = new TransactionMessage({
        payerKey: signer.publicKey,
        recentBlockhash: blockhash,
        instructions: [increaseLimitIx, registerBuyIx],
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([signer]);
    const txid = await connection.sendTransaction(transaction);
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);
}
  
initProductTree();