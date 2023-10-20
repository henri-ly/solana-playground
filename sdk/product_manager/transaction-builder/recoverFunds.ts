import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  RecoverFundsInstructionAccounts,
  createRecoverFundsInstruction,
} from '../utils/instructions/recoverFunds'

export async function createRecoverFundsTransaction(
  connection: Connection,
  accounts: RecoverFundsInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createRecoverFundsInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
