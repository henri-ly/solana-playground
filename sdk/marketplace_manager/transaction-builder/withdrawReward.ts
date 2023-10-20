import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  WithdrawRewardInstructionAccounts,
  createWithdrawRewardInstruction,
} from '../utils/instructions/withdrawReward'

export async function createWithdrawRewardTransaction(
  connection: Connection,
  accounts: WithdrawRewardInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createWithdrawRewardInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
