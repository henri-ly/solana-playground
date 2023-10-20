import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  EditProductInstructionAccounts,
  createEditProductInstruction,
} from '../utils/instructions/editProduct'

import BN from 'bn.js'

export async function createEditProductTransaction(
  connection: Connection,
  accounts: EditProductInstructionAccounts,
  productPrice: BN,
): Promise<VersionedTransaction> {
  const ix = createEditProductInstruction(accounts, { productPrice })
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
