import { Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js"
import { DoMessageInstructionAccounts, DoMessageInstructionArgs, createDoMessageInstruction } from "./utils/solita/aleph-messages/instructions/index.js"

async function generateMessages() {
    const secretString = process.env.secret;
    if (!secretString) throw new Error("Secret not found in environment variables.");
    
    const secret: number[] = JSON.parse(secretString);
    const secretUint8Array = new Uint8Array(secret);
    const account = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(process.env.rpc || '');
    const pubkey = new PublicKey('rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR')
    const accounts: DoMessageInstructionAccounts = {
        sender: pubkey
    } 
    const args: DoMessageInstructionArgs = {
        msgtype: 'aggregate',
        msgcontent: '{ test: true, program: aleph-solana-program }'
    }
    const ix = createDoMessageInstruction(accounts, args)
    let transaction = new Transaction().add(ix)
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
    transaction.recentBlockhash = blockhash
    transaction.feePayer = pubkey
    transaction.partialSign(account)

    await connection.sendRawTransaction(transaction.serialize())
}

await generateMessages()