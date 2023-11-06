import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  UpdateTreeInstructionAccounts,
  createUpdateTreeInstruction,
  UpdateTreeInstructionArgs,
} from '../utils/instructions/updateTree'

export async function createUpdateTreeTransaction(
  connection: Connection,
  accounts: UpdateTreeInstructionAccounts,
  args: UpdateTreeInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createUpdateTreeInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
