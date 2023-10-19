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
 * @category Deposit
 * @category generated
 */
export type DepositInstructionArgs = {
  amount: beet.bignum
}
/**
 * @category Instructions
 * @category Deposit
 * @category generated
 */
export const depositStruct = new beet.BeetArgsStruct<
  DepositInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['amount', beet.u64],
  ],
  'DepositInstructionArgs'
)
/**
 * Accounts required by the _deposit_ instruction
 *
 * @property [_writable_, **signer**] signer
 * @property [_writable_] network
 * @property [_writable_] proposal
 * @property [_writable_] proposalVault
 * @property [_writable_] depositVault
 * @property [_writable_] receiverVault
 * @property [] paymentMint
 * @property [_writable_] networkMint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category Deposit
 * @category generated
 */
export type DepositInstructionAccounts = {
  signer: web3.PublicKey
  network: web3.PublicKey
  proposal: web3.PublicKey
  proposalVault: web3.PublicKey
  depositVault: web3.PublicKey
  receiverVault: web3.PublicKey
  paymentMint: web3.PublicKey
  networkMint: web3.PublicKey
  rent?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const depositInstructionDiscriminator = [
  242, 35, 198, 137, 82, 225, 242, 182,
]

/**
 * Creates a _Deposit_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category Deposit
 * @category generated
 */
export function createDepositInstruction(
  accounts: DepositInstructionAccounts,
  args: DepositInstructionArgs,
  programId = new web3.PublicKey('BHQvQgoMZhCKuVeoVhsy8agZQYwMuvzXwrEYoEHHDgGJ')
) {
  const [data] = depositStruct.serialize({
    instructionDiscriminator: depositInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.signer,
      isWritable: true,
      isSigner: true,
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
      pubkey: accounts.proposalVault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.depositVault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.receiverVault,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.paymentMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.networkMint,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.rent ?? web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.tokenProgram ?? splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.associatedTokenProgram,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
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
