import { Connection, Keypair, Transaction } from "@solana/web3.js"
import { DoMessageInstructionAccounts, DoMessageInstructionArgs, createDoMessageInstruction } from "./utils/solita/aleph-messages/instructions/index.js"

async function generateMessages() {
    const secretString = process.env.secret;
    if (!secretString) throw new Error("Secret not found in environment variables.");
    
    const secret: number[] = JSON.parse(secretString);
    const secretUint8Array = new Uint8Array(secret);
    const account = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(process.env.rpc || '');
    const accounts: DoMessageInstructionAccounts = {
        sender: account.publicKey
    } 
    const args: DoMessageInstructionArgs = {
        msgtype: 'aggregate',
        msgcontent: '{ test: true, program: aleph-solana-program }'
    }
    const ix = createDoMessageInstruction(accounts, args)
    let transaction = new Transaction().add(ix)
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
    transaction.recentBlockhash = blockhash
    transaction.feePayer = account.publicKey
    transaction.partialSign(account)

    await connection.sendRawTransaction(transaction.serialize())
}

await generateMessages()