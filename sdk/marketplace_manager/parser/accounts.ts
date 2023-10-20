import { ACCOUNTS_DATA_LAYOUT, AccountType } from '../layout/accounts.js'

import {
  TokenConfig,
  PermissionConfig,
  FeesConfig,
  RewardsConfig,
  MarketplaceBumps,
  SellerConfig,
  ProductBumps,
} from '../utils/types'

export const accountParsers = {
  [AccountType.Marketplace]: parseMarketplace,
  [AccountType.Product]: parseProduct,
  [AccountType.Reward]: parseReward,
  [AccountType.Access]: parseAccess,
}

function parseMarketplace(accountData: Buffer): MarketplaceInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Marketplace].deserialize(
    accountData,
  )[0]
}

function parseProduct(accountData: Buffer): ProductInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Product].deserialize(accountData)[0]
}

function parseReward(accountData: Buffer): RewardInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Reward].deserialize(accountData)[0]
}

function parseAccess(accountData: Buffer): AccessInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Access].deserialize(accountData)[0]
}

export type MarketplaceInfo = {
  authority: string
  tokenConfig: TokenConfig
  permissionConfig: PermissionConfig
  feesConfig: FeesConfig
  rewardsConfig: RewardsConfig
  bumps: MarketplaceBumps
}

export type ProductInfo = {
  authority: string
  id: any
  productMint: string
  merkleTree: string
  sellerConfig: SellerConfig
  bumps: ProductBumps
}

export type RewardInfo = {
  authority: string
  bump: number
}

export type AccessInfo = {
  authority: string
  bump: number
}
