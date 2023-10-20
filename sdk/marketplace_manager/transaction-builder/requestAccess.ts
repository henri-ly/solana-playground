import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  RequestAccessInstructionAccounts,
  createRequestAccessInstruction,
} from '../utils/instructions/requestAccess'

export async function createRequestAccessTransaction(
  connection: Connection,
  accounts: RequestAccessInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createRequestAccessInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
