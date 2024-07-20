import { ACCOUNTS_DATA_LAYOUT, AccountType } from '../layout/accounts.js'

import { MarketplaceBumps, SellerConfig } from '../utils/types'

export const accountParsers = {
  [AccountType.AccessRequest]: parseAccessRequest,
  [AccountType.Marketplace]: parseMarketplace,
  [AccountType.Product]: parseProduct,
}

function parseAccessRequest(accountData: Buffer): AccessRequestInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.AccessRequest].deserialize(
    accountData,
  )[0]
}

function parseMarketplace(accountData: Buffer): MarketplaceInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Marketplace].deserialize(
    accountData,
  )[0]
}

function parseProduct(accountData: Buffer): ProductInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Product].deserialize(accountData)[0]
}

export type AccessRequestInfo = {
  payer: string
}

export type MarketplaceInfo = {
  authority: string
  bumps: MarketplaceBumps
  accessMint: any
  feesConfig: any
  rewardsConfig: any
}

export type ProductInfo = {
  authority: string
  marketplace: string
  id: any
  sellerConfig: SellerConfig
}
