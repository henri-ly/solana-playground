import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  EscrowPayInstructionAccounts,
  createEscrowPayInstruction,
  EscrowPayInstructionArgs,
} from '../utils/instructions/escrowPay'

export async function createEscrowPayTransaction(
  connection: Connection,
  accounts: EscrowPayInstructionAccounts,
  args: EscrowPayInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createEscrowPayInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
