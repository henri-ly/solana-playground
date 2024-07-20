import {
  payInstructionDiscriminator,
  payStruct,
} from '../utils/instructions/index.js'

export enum InstructionType {
  Pay = 'Pay',
}

export function getInstructionType(data: Buffer): InstructionType | undefined {
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
  return IX_DISCRIMINATORS[discriminator.toString('ascii')]
}

export const payAccounts = [
  'signer',
  'mint',
  'buyerVault',
  'sellerVault',
  'tokenProgram',
  'index',
]

const IX_DISCRIMINATORS = {
  [Buffer.from(payInstructionDiscriminator).toString('ascii')]:
    InstructionType.Pay,
}

export const IX_DATA_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.Pay]: payStruct,
}

export const IX_ACCOUNTS_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.Pay]: payAccounts,
}
