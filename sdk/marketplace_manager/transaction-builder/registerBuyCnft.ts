import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  RegisterBuyCnftInstructionAccounts,
  createRegisterBuyCnftInstruction,
} from '../utils/instructions/registerBuyCnft'
import { RegisterBuyCnftParams } from '../utils/types'

export async function createRegisterBuyCnftTransaction(
  connection: Connection,
  accounts: RegisterBuyCnftInstructionAccounts,
  params: RegisterBuyCnftParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createRegisterBuyCnftInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
