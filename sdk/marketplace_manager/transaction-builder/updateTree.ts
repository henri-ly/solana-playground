import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  UpdateTreeInstructionAccounts,
  createUpdateTreeInstruction,
} from '../utils/instructions/updateTree'
import { UpdateProductTreeParams } from '../utils/types'

export async function createUpdateTreeTransaction(
  connection: Connection,
  accounts: UpdateTreeInstructionAccounts,
  params: UpdateProductTreeParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createUpdateTreeInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
