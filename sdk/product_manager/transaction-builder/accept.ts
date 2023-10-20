import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  AcceptInstructionAccounts,
  createAcceptInstruction,
} from '../utils/instructions/accept'

export async function createAcceptTransaction(
  connection: Connection,
  accounts: AcceptInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createAcceptInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
