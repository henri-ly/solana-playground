import {
  productDiscriminator,
  productBeet,
  escrowDiscriminator,
  escrowBeet,
} from '../utils/accounts/index.js'

export enum AccountType {
  Product = 'Product',
  Escrow = 'Escrow',
}

export function getAccountType(data: Buffer): AccountType | undefined {
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
  return ACCOUNT_DISCRIMINATOR[discriminator.toString('ascii')]
}

export const ACCOUNT_DISCRIMINATOR: Record<AccountType, Buffer> = {
  [AccountType.Product]: Buffer.from(productDiscriminator),
  [AccountType.Escrow]: Buffer.from(escrowDiscriminator),
}

export const ACCOUNTS_DATA_LAYOUT: Record<AccountType, any> = {
  [AccountType.Product]: productBeet,
  [AccountType.Escrow]: escrowBeet,
}
