import {
  marketplaceDiscriminator,
  marketplaceBeet,
  productDiscriminator,
  productBeet,
  rewardDiscriminator,
  rewardBeet,
  accessDiscriminator,
  accessBeet,
} from '../utils/accounts/index.js'

export enum AccountType {
  Marketplace = 'Marketplace',
  Product = 'Product',
  Reward = 'Reward',
  Access = 'Access',
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
  [Buffer.from(marketplaceDiscriminator).toString('ascii')]:
    AccountType.Marketplace,
  [Buffer.from(productDiscriminator).toString('ascii')]: AccountType.Product,
  [Buffer.from(rewardDiscriminator).toString('ascii')]: AccountType.Reward,
  [Buffer.from(accessDiscriminator).toString('ascii')]: AccountType.Access,
}

export const ACCOUNTS_DATA_LAYOUT: Record<AccountType, any> = {
  [AccountType.Marketplace]: marketplaceBeet,
  [AccountType.Product]: productBeet,
  [AccountType.Reward]: rewardBeet,
  [AccountType.Access]: accessBeet,
}
