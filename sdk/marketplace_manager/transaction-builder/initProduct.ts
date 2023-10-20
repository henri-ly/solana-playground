import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitProductInstructionAccounts,
  createInitProductInstruction,
} from '../utils/instructions/initProduct'
import { InitProductParams } from '../utils/types'

export async function createInitProductTransaction(
  connection: Connection,
  accounts: InitProductInstructionAccounts,
  params: InitProductParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createInitProductInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
