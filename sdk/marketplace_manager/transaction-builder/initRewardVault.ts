import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitRewardVaultInstructionAccounts,
  createInitRewardVaultInstruction,
} from '../utils/instructions/initRewardVault'

export async function createInitRewardVaultTransaction(
  connection: Connection,
  accounts: InitRewardVaultInstructionAccounts,
): Promise<VersionedTransaction> {
  const ix = createInitRewardVaultInstruction(accounts)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
