import {
  accessRequestDiscriminator,
  accessRequestBeet,
  marketplaceDiscriminator,
  marketplaceBeet,
  productDiscriminator,
  productBeet,
} from '../utils/accounts/index.js'

export enum AccountType {
  AccessRequest = 'AccessRequest',
  Marketplace = 'Marketplace',
  Product = 'Product',
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
  [Buffer.from(accessRequestDiscriminator).toString('ascii')]:
    AccountType.AccessRequest,
  [Buffer.from(marketplaceDiscriminator).toString('ascii')]:
    AccountType.Marketplace,
  [Buffer.from(productDiscriminator).toString('ascii')]: AccountType.Product,
}

export const ACCOUNTS_DATA_LAYOUT: Record<AccountType, any> = {
  [AccountType.AccessRequest]: accessRequestBeet,
  [AccountType.Marketplace]: marketplaceBeet,
  [AccountType.Product]: productBeet,
}
