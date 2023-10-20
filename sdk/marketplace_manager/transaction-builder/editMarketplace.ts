import {
  Connection,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  EditMarketplaceInstructionAccounts,
  createEditMarketplaceInstruction,
} from '../utils/instructions/editMarketplace'
import { EditMarketplaceParams } from '../utils/types'

export async function createEditMarketplaceTransaction(
  connection: Connection,
  accounts: EditMarketplaceInstructionAccounts,
  params: EditMarketplaceParams,
): Promise<VersionedTransaction> {
  const args = { params }
  const ix = createEditMarketplaceInstruction(accounts, args)
  let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash
  const messageV0 = new TransactionMessage({
    payerKey: accounts.signer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message()

  return new VersionedTransaction(messageV0)
}
