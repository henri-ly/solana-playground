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
  const discriminator: string = Buffer.from(
    data.buffer,
    data.byteOffset,
    8,
  ).toString('ascii')
  return ACCOUNT_DISCRIMINATOR[discriminator]
}

export const ACCOUNT_DISCRIMINATOR: Record<string, AccountType> = {
  [Buffer.from(productDiscriminator).toString('ascii')]: AccountType.Product,
  [Buffer.from(escrowDiscriminator).toString('ascii')]: AccountType.Escrow,
}

export const ACCOUNTS_DATA_LAYOUT: Record<AccountType, any> = {
  [AccountType.Product]: productBeet,
  [AccountType.Escrow]: escrowBeet,
}
