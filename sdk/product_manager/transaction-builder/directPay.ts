import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  DirectPayInstructionAccounts,
  createDirectPayInstruction,
} from '../utils/instructions/directPay'

import BN from 'bn.js'

export async function createDirectPayTransaction(
  connection: Connection,
  accounts: DirectPayInstructionAccounts,
  productAmount: BN,
): Promise<VersionedTransaction> {
  const ix = createDirectPayInstruction(accounts, { productAmount })
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
