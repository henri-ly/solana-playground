import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  PayInstructionAccounts,
  createPayInstruction,
  PayInstructionArgs,
} from '../utils/instructions/pay'

export async function createPayTransaction(
  connection: Connection,
  accounts: PayInstructionAccounts,
  args: PayInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createPayInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
