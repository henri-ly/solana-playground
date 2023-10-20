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
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
  return ACCOUNT_DISCRIMINATOR[discriminator.toString('ascii')]
}

export const ACCOUNT_DISCRIMINATOR: Record<AccountType, Buffer> = {
  [AccountType.Marketplace]: Buffer.from(marketplaceDiscriminator),
  [AccountType.Product]: Buffer.from(productDiscriminator),
  [AccountType.Reward]: Buffer.from(rewardDiscriminator),
  [AccountType.Access]: Buffer.from(accessDiscriminator),
}

export const ACCOUNTS_DATA_LAYOUT: Record<AccountType, any> = {
  [AccountType.Marketplace]: marketplaceBeet,
  [AccountType.Product]: productBeet,
  [AccountType.Reward]: rewardBeet,
  [AccountType.Access]: accessBeet,
}
