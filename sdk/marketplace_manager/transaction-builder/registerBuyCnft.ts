import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  RegisterBuyCnftInstructionAccounts,
  createRegisterBuyCnftInstruction,
  RegisterBuyCnftInstructionArgs,
} from '../utils/instructions/registerBuyCnft'

export async function createRegisterBuyCnftTransaction(
  connection: Connection,
  accounts: RegisterBuyCnftInstructionAccounts,
  args: RegisterBuyCnftInstructionArgs,
): Promise<VersionedTransaction> {
  const ix = createRegisterBuyCnftInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
