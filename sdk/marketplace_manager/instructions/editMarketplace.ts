/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  EditMarketplaceParams,
  editMarketplaceParamsBeet,
} from '../types/EditMarketplaceParams'

/**
 * @category Instructions
 * @category EditMarketplace
 * @category generated
 */
export type EditMarketplaceInstructionArgs = {
  params: EditMarketplaceParams
}
/**
 * @category Instructions
 * @category EditMarketplace
 * @category generated
 */
export const editMarketplaceStruct = new beet.BeetArgsStruct<
  EditMarketplaceInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['params', editMarketplaceParamsBeet],
  ],
  'EditMarketplaceInstructionArgs'
)
/**
 * Accounts required by the _editMarketplace_ instruction
 *
 * @property [_writable_, **signer**] signer
 * @property [_writable_] marketplace
 * @property [] rewardMint
 * @property [] discountMint
 * @category Instructions
 * @category EditMarketplace
 * @category generated
 */
export type EditMarketplaceInstructionAccounts = {
  signer: web3.PublicKey
  marketplace: web3.PublicKey
  rewardMint: web3.PublicKey
  discountMint: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const editMarketplaceInstructionDiscriminator = [
  63, 97, 25, 236, 101, 55, 240, 177,
]

/**
 * Creates a _EditMarketplace_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category EditMarketplace
 * @category generated
 */
export function createEditMarketplaceInstruction(
  accounts: EditMarketplaceInstructionAccounts,
  args: EditMarketplaceInstructionArgs,
  programId = new web3.PublicKey('brick5uEiJqSkfuAvMtKmq7kiuEVmbjVMiigyV51GRF')
) {
  const [data] = editMarketplaceStruct.serialize({
    instructionDiscriminator: editMarketplaceInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.signer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.marketplace,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.rewardMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.discountMint,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
