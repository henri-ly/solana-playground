import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  EscrowPayInstructionAccounts,
  createEscrowPayInstruction,
} from '../utils/instructions/escrowPay'

import BN from 'bn.js'

export async function createEscrowPayTransaction(
  connection: Connection,
  accounts: EscrowPayInstructionAccounts,
  productAmount: BN,
  expireTime: BN,
): Promise<VersionedTransaction> {
  const ix = createEscrowPayInstruction(accounts, { productAmount })
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
