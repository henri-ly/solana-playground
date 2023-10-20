import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  DenyInstructionAccounts,
  createDenyInstruction,
} from '../utils/instructions/deny'

export async function createDenyTransaction(
  connection: Connection,
  accounts: DenyInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createDenyInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
