import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitProductInstructionAccounts,
  createInitProductInstruction,
} from '../utils/instructions/initProduct'

import BN from 'bn.js'

export async function createInitProductTransaction(
  connection: Connection,
  accounts: InitProductInstructionAccounts,
  id: any,
  price: BN,
): Promise<VersionedTransaction> {
  const ix = createInitProductInstruction(accounts, { id })
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
