import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitProductTreeInstructionAccounts,
  createInitProductTreeInstruction,
} from '../utils/instructions/initProductTree'
import { InitProductTreeParams } from '../utils/types'

export async function createInitProductTreeTransaction(
  connection: Connection,
  accounts: InitProductTreeInstructionAccounts,
  params: InitProductTreeParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createInitProductTreeInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
