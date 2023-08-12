import { RequestAccessInstructionAccounts, createRequestAccessInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { BRICK_PROGRAM_ID_PK } from "./constants.js";
import dotenv from 'dotenv';
dotenv.config();

async function requestAccess() {
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
    const [request] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("request", "utf-8"),
          signer.publicKey.toBuffer(),
          marketplacePubkey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const accounts: RequestAccessInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        request: request,
    };
    const ix = createRequestAccessInstruction(accounts);
    let transaction = new Transaction().add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer);

    await connection.sendRawTransaction(transaction.serialize());
}

requestAccess();