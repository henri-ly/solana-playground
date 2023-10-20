import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  InitMarketplaceInstructionAccounts,
  createInitMarketplaceInstruction,
} from '../utils/instructions/initMarketplace'
import { InitMarketplaceParams } from '../utils/types'

export async function createInitMarketplaceTransaction(
  connection: Connection,
  accounts: InitMarketplaceInstructionAccounts,
  params: InitMarketplaceParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createInitMarketplaceInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
