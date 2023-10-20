import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  RegisterBuyInstructionAccounts,
  createRegisterBuyInstruction,
} from '../utils/instructions/registerBuy'

export async function createRegisterBuyTransaction(
  connection: Connection,
  accounts: RegisterBuyInstructionAccounts,
  amount: number,
): Promise<VersionedTransaction> {
  const ix = createRegisterBuyInstruction(accounts, { amount })
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
