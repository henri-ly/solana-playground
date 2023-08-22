import { AirdropAccessInstructionAccounts, createAirdropAccessInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { BRICK_PROGRAM_ID_PK } from "./constants.js";
import dotenv from 'dotenv';
dotenv.config();

async function airdropAccess() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const [marketplacePubkey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("marketplace", "utf-8"),
          signer.publicKey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [accessMint] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("access_mint", "utf-8"),
          marketplacePubkey.toBuffer(),
        ],
        BRICK_PROGRAM_ID_PK
    );
    const receiver = new PublicKey("8zWzM8NVDrgqZMqcKhESsTumo1JTyhLjRDpBMZBCy394");
    const receiverVault = getAssociatedTokenAddressSync(accessMint, receiver, false, TOKEN_2022_PROGRAM_ID);
    const accounts: AirdropAccessInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        tokenProgram2022: TOKEN_2022_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        signer: signer.publicKey,
        receiver: receiver,
        marketplace: marketplacePubkey,
        accessMint: accessMint,
        accessVault: receiverVault,
    };
    const ix = createAirdropAccessInstruction(accounts);
    let transaction = new Transaction().add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer);

    await connection.sendRawTransaction(transaction.serialize());
}

airdropAccess();