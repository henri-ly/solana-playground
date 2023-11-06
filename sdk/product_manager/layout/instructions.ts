import {
  initProductInstructionDiscriminator,
  initProductStruct,
  escrowPayInstructionDiscriminator,
  escrowPayStruct,
  directPayInstructionDiscriminator,
  directPayStruct,
  acceptInstructionDiscriminator,
  acceptStruct,
  denyInstructionDiscriminator,
  denyStruct,
  recoverFundsInstructionDiscriminator,
  recoverFundsStruct,
} from '../utils/instructions/index.js'

export enum InstructionType {
  InitProduct = 'InitProduct',
  EscrowPay = 'EscrowPay',
  DirectPay = 'DirectPay',
  Accept = 'Accept',
  Deny = 'Deny',
  RecoverFunds = 'RecoverFunds',
}

export function getInstructionType(data: Buffer): InstructionType | undefined {
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
  return IX_DISCRIMINATORS[discriminator.toString('ascii')]
}

export const initProductAccounts = [
  'signer',
  'product',
  'paymentMint',
  'rent',
  'systemProgram',
]
export const escrowPayAccounts = [
  'signer',
  'seller',
  'product',
  'escrow',
  'escrowVault',
  'transferVault',
  'paymentMint',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const directPayAccounts = [
  'signer',
  'seller',
  'product',
  'from',
  'to',
  'paymentMint',
  'rent',
  'tokenProgram',
  'associatedTokenProgram',
  'systemProgram',
]
export const acceptAccounts = [
  'signer',
  'buyer',
  'escrow',
  'product',
  'escrowVault',
  'transferVault',
  'paymentMint',
  'systemProgram',
  'tokenProgram',
]
export const denyAccounts = [
  'signer',
  'buyer',
  'escrow',
  'product',
  'escrowVault',
  'transferVault',
  'paymentMint',
  'systemProgram',
  'tokenProgram',
]
export const recoverFundsAccounts = [
  'signer',
  'seller',
  'escrow',
  'product',
  'escrowVault',
  'transferVault',
  'paymentMint',
  'systemProgram',
  'tokenProgram',
]

const IX_DISCRIMINATORS = {
  [Buffer.from(initProductInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitProduct,
  [Buffer.from(escrowPayInstructionDiscriminator).toString('ascii')]:
    InstructionType.EscrowPay,
  [Buffer.from(directPayInstructionDiscriminator).toString('ascii')]:
    InstructionType.DirectPay,
  [Buffer.from(acceptInstructionDiscriminator).toString('ascii')]:
    InstructionType.Accept,
  [Buffer.from(denyInstructionDiscriminator).toString('ascii')]:
    InstructionType.Deny,
  [Buffer.from(recoverFundsInstructionDiscriminator).toString('ascii')]:
    InstructionType.RecoverFunds,
}

export const IX_DATA_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.InitProduct]: initProductStruct,
  [InstructionType.EscrowPay]: escrowPayStruct,
  [InstructionType.DirectPay]: directPayStruct,
  [InstructionType.Accept]: acceptStruct,
  [InstructionType.Deny]: denyStruct,
  [InstructionType.RecoverFunds]: recoverFundsStruct,
}

export const IX_ACCOUNTS_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.InitProduct]: initProductAccounts,
  [InstructionType.EscrowPay]: escrowPayAccounts,
  [InstructionType.DirectPay]: directPayAccounts,
  [InstructionType.Accept]: acceptAccounts,
  [InstructionType.Deny]: denyAccounts,
  [InstructionType.RecoverFunds]: recoverFundsAccounts,
}
