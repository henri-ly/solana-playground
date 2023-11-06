import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  DirectPayInstructionAccounts,
  createDirectPayInstruction,
  DirectPayInstructionArgs,
} from '../utils/instructions/directPay'

export async function createDirectPayTransaction(
  connection: Connection,
  accounts: DirectPayInstructionAccounts,
  args: DirectPayInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createDirectPayInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
