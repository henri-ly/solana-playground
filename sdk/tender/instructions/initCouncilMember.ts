/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as splToken from '@solana/spl-token'
import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category InitCouncilMember
 * @category generated
 */
export const initCouncilMemberStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'InitCouncilMemberInstructionArgs'
)
/**
 * Accounts required by the _initCouncilMember_ instruction
 *
 * @property [_writable_, **signer**] signer
 * @property [_writable_] receiver
 * @property [_writable_] network
 * @property [_writable_] proposal
 * @property [_writable_] councilCollection
 * @property [_writable_] councilCollectionMetadata
 * @property [_writable_] councilCollectionMasterEdition
 * @property [_writable_] councilMetadata
 * @property [_writable_] councilMasterEdition
 * @property [_writable_, **signer**] receiverVault
 * @property [] tokenMetadataProgram
 * @category Instructions
 * @category InitCouncilMember
 * @category generated
 */
export type InitCouncilMemberInstructionAccounts = {
  signer: web3.PublicKey
  receiver: web3.PublicKey
  network: web3.PublicKey
  proposal: web3.PublicKey
  councilCollection: web3.PublicKey
  councilCollectionMetadata: web3.PublicKey
  councilCollectionMasterEdition: web3.PublicKey
  councilMetadata: web3.PublicKey
  councilMasterEdition: web3.PublicKey
  receiverVault: web3.PublicKey
  tokenMetadataProgram: web3.PublicKey
  rent?: web3.PublicKey
  systemProgram?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const initCouncilMemberInstructionDiscriminator = [
  178, 111, 52, 235, 205, 98, 133, 78,
]

/**
 * Creates a _InitCouncilMember_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category InitCouncilMember
 * @category generated
 */
export function createInitCouncilMemberInstruction(
  accounts: InitCouncilMemberInstructionAccounts,
  programId = new web3.PublicKey('BHQvQgoMZhCKuVeoVhsy8agZQYwMuvzXwrEYoEHHDgGJ')
) {
  const [data] = initCouncilMemberStruct.serialize({
    instructionDiscriminator: initCouncilMemberInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.signer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.receiver,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.network,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.proposal,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.councilCollection,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.councilCollectionMetadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.councilCollectionMasterEdition,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.councilMetadata,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.councilMasterEdition,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.receiverVault,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.tokenMetadataProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.rent ?? web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
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
