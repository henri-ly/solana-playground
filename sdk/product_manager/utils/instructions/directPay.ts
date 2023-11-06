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
 * @category DirectPay
 * @category generated
 */
export type DirectPayInstructionArgs = {
  productAmount: beet.bignum
}
/**
 * @category Instructions
 * @category DirectPay
 * @category generated
 */
export const directPayStruct = new beet.BeetArgsStruct<
  DirectPayInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['productAmount', beet.u64],
  ],
  'DirectPayInstructionArgs'
)
/**
 * Accounts required by the _directPay_ instruction
 *
 * @property [_writable_, **signer**] signer
 * @property [] seller
 * @property [_writable_] product
 * @property [_writable_] from
 * @property [_writable_] to
 * @property [] paymentMint
 * @property [] associatedTokenProgram
 * @category Instructions
 * @category DirectPay
 * @category generated
 */
export type DirectPayInstructionAccounts = {
  signer: web3.PublicKey
  seller: web3.PublicKey
  product: web3.PublicKey
  from: web3.PublicKey
  to: web3.PublicKey
  paymentMint: web3.PublicKey
  rent?: web3.PublicKey
  tokenProgram?: web3.PublicKey
  associatedTokenProgram: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const directPayInstructionDiscriminator = [
  11, 101, 61, 114, 142, 27, 83, 12,
]

/**
 * Creates a _DirectPay_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category DirectPay
 * @category generated
 */
export function createDirectPayInstruction(
  accounts: DirectPayInstructionAccounts,
  args: DirectPayInstructionArgs,
  programId = new web3.PublicKey('6NSfzFwHeuDCLzFwAo3yQ2KLLb9bThvkEVyeWChoAqBa')
) {
  const [data] = directPayStruct.serialize({
    instructionDiscriminator: directPayInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.signer,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.seller,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.product,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.from,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.to,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.paymentMint,
      isWritable: false,
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
