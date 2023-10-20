import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitRewardInstructionAccounts,
  createInitRewardInstruction,
} from '../utils/instructions/initReward'

export async function createInitRewardTransaction(
  connection: Connection,
  accounts: InitRewardInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createInitRewardInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
