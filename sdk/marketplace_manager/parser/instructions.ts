import {
  IX_ACCOUNTS_LAYOUT,
  IX_DATA_LAYOUT,
  InstructionType,
} from '../layout/instructions.js'
import {
  EditMarketplaceParams,
  InitMarketplaceParams,
  InitProductTreeParams,
  InitProductParams,
  RegisterBuyCnftParams,
  UpdateProductTreeParams,
} from '../utils/types'

import BN from 'bn.js'

export const instructionParsers = {
  [InstructionType.AcceptAccess]: parseAcceptAccess,
  [InstructionType.AirdropAccess]: parseAirdropAccess,
  [InstructionType.EditProduct]: parseEditProduct,
  [InstructionType.EditMarketplace]: parseEditMarketplace,
  [InstructionType.InitBounty]: parseInitBounty,
  [InstructionType.InitMarketplace]: parseInitMarketplace,
  [InstructionType.InitProductTree]: parseInitProductTree,
  [InstructionType.InitProduct]: parseInitProduct,
  [InstructionType.InitRewardVault]: parseInitRewardVault,
  [InstructionType.InitReward]: parseInitReward,
  [InstructionType.RegisterBuyCnft]: parseRegisterBuyCnft,
  [InstructionType.RegisterBuyFungible]: parseRegisterBuyFungible,
  [InstructionType.RegisterBuy]: parseRegisterBuy,
  [InstructionType.RequestAccess]: parseRequestAccess,
  [InstructionType.UpdateTree]: parseUpdateTree,
  [InstructionType.WithdrawReward]: parseWithdrawReward,
}

function parseAcceptAccess(
  instructionData: Buffer,
  accountsKeys: string[],
): AcceptAccessInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.AcceptAccess]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.AcceptAccess].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    receiver: accountsKeys[accounts.indexOf('receiver')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    request: accountsKeys[accounts.indexOf('request')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseAirdropAccess(
  instructionData: Buffer,
  accountsKeys: string[],
): AirdropAccessInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.AirdropAccess]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.AirdropAccess].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    receiver: accountsKeys[accounts.indexOf('receiver')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseEditProduct(
  instructionData: Buffer,
  accountsKeys: string[],
): EditProductInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.EditProduct]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.EditProduct].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    product: accountsKeys[accounts.indexOf('product')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}
function parseEditMarketplace(
  instructionData: Buffer,
  accountsKeys: string[],
): EditMarketplaceInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.EditMarketplace]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.EditMarketplace].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    discountMint: accountsKeys[accounts.indexOf('discountMint')],
    ...result,
  }
}
function parseInitBounty(
  instructionData: Buffer,
  accountsKeys: string[],
): InitBountyInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitBounty]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitBounty].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseInitMarketplace(
  instructionData: Buffer,
  accountsKeys: string[],
): InitMarketplaceInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitMarketplace]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitMarketplace].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    discountMint: accountsKeys[accounts.indexOf('discountMint')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseInitProductTree(
  instructionData: Buffer,
  accountsKeys: string[],
): InitProductTreeInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitProductTree]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitProductTree].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    productMint: accountsKeys[accounts.indexOf('productMint')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    productMintVault: accountsKeys[accounts.indexOf('productMintVault')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    masterEdition: accountsKeys[accounts.indexOf('masterEdition')],
    metadata: accountsKeys[accounts.indexOf('metadata')],
    merkleTree: accountsKeys[accounts.indexOf('merkleTree')],
    treeAuthority: accountsKeys[accounts.indexOf('treeAuthority')],
    rent: accountsKeys[accounts.indexOf('rent')],
    logWrapper: accountsKeys[accounts.indexOf('logWrapper')],
    ...result,
  }
}
function parseInitProduct(
  instructionData: Buffer,
  accountsKeys: string[],
): InitProductInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitProduct]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitProduct].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    productMint: accountsKeys[accounts.indexOf('productMint')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    accessMint: accountsKeys[accounts.indexOf('accessMint')],
    accessVault: accountsKeys[accounts.indexOf('accessVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseInitRewardVault(
  instructionData: Buffer,
  accountsKeys: string[],
): InitRewardVaultInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitRewardVault]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitRewardVault].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    reward: accountsKeys[accounts.indexOf('reward')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    rewardVault: accountsKeys[accounts.indexOf('rewardVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseInitReward(
  instructionData: Buffer,
  accountsKeys: string[],
): InitRewardInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitReward]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitReward].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    reward: accountsKeys[accounts.indexOf('reward')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    rewardVault: accountsKeys[accounts.indexOf('rewardVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseRegisterBuyCnft(
  instructionData: Buffer,
  accountsKeys: string[],
): RegisterBuyCnftInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RegisterBuyCnft]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RegisterBuyCnft].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    marketplaceAuth: accountsKeys[accounts.indexOf('marketplaceAuth')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    productMint: accountsKeys[accounts.indexOf('productMint')],
    buyerTransferVault: accountsKeys[accounts.indexOf('buyerTransferVault')],
    sellerTransferVault: accountsKeys[accounts.indexOf('sellerTransferVault')],
    marketplaceTransferVault:
      accountsKeys[accounts.indexOf('marketplaceTransferVault')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    sellerReward: accountsKeys[accounts.indexOf('sellerReward')],
    sellerRewardVault: accountsKeys[accounts.indexOf('sellerRewardVault')],
    buyerReward: accountsKeys[accounts.indexOf('buyerReward')],
    buyerRewardVault: accountsKeys[accounts.indexOf('buyerRewardVault')],
    metadata: accountsKeys[accounts.indexOf('metadata')],
    masterEdition: accountsKeys[accounts.indexOf('masterEdition')],
    treeAuthority: accountsKeys[accounts.indexOf('treeAuthority')],
    bubblegumSigner: accountsKeys[accounts.indexOf('bubblegumSigner')],
    merkleTree: accountsKeys[accounts.indexOf('merkleTree')],
    rent: accountsKeys[accounts.indexOf('rent')],
    logWrapper: accountsKeys[accounts.indexOf('logWrapper')],
    ...result,
  }
}
function parseRegisterBuyFungible(
  instructionData: Buffer,
  accountsKeys: string[],
): RegisterBuyFungibleInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RegisterBuyFungible]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RegisterBuyFungible].deserialize(
      instructionData,
    )
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    marketplaceAuth: accountsKeys[accounts.indexOf('marketplaceAuth')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    productMint: accountsKeys[accounts.indexOf('productMint')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    buyerTokenVault: accountsKeys[accounts.indexOf('buyerTokenVault')],
    buyerTransferVault: accountsKeys[accounts.indexOf('buyerTransferVault')],
    sellerTransferVault: accountsKeys[accounts.indexOf('sellerTransferVault')],
    marketplaceTransferVault:
      accountsKeys[accounts.indexOf('marketplaceTransferVault')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    sellerReward: accountsKeys[accounts.indexOf('sellerReward')],
    sellerRewardVault: accountsKeys[accounts.indexOf('sellerRewardVault')],
    buyerReward: accountsKeys[accounts.indexOf('buyerReward')],
    buyerRewardVault: accountsKeys[accounts.indexOf('buyerRewardVault')],
    ...result,
  }
}
function parseRegisterBuy(
  instructionData: Buffer,
  accountsKeys: string[],
): RegisterBuyInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RegisterBuy]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RegisterBuy].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    marketplaceAuth: accountsKeys[accounts.indexOf('marketplaceAuth')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    buyerTransferVault: accountsKeys[accounts.indexOf('buyerTransferVault')],
    sellerTransferVault: accountsKeys[accounts.indexOf('sellerTransferVault')],
    marketplaceTransferVault:
      accountsKeys[accounts.indexOf('marketplaceTransferVault')],
    bountyVault: accountsKeys[accounts.indexOf('bountyVault')],
    sellerReward: accountsKeys[accounts.indexOf('sellerReward')],
    sellerRewardVault: accountsKeys[accounts.indexOf('sellerRewardVault')],
    buyerReward: accountsKeys[accounts.indexOf('buyerReward')],
    buyerRewardVault: accountsKeys[accounts.indexOf('buyerRewardVault')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseRequestAccess(
  instructionData: Buffer,
  accountsKeys: string[],
): RequestAccessInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RequestAccess]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RequestAccess].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    request: accountsKeys[accounts.indexOf('request')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseUpdateTree(
  instructionData: Buffer,
  accountsKeys: string[],
): UpdateTreeInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.UpdateTree]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.UpdateTree].deserialize(instructionData)
  const { ...result } = context

  return {
    payer: accountsKeys[accounts.indexOf('payer')],
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    product: accountsKeys[accounts.indexOf('product')],
    treeAuthority: accountsKeys[accounts.indexOf('treeAuthority')],
    merkleTree: accountsKeys[accounts.indexOf('merkleTree')],
    logWrapper: accountsKeys[accounts.indexOf('logWrapper')],
    ...result,
  }
}
function parseWithdrawReward(
  instructionData: Buffer,
  accountsKeys: string[],
): WithdrawRewardInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.WithdrawReward]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.WithdrawReward].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    marketplace: accountsKeys[accounts.indexOf('marketplace')],
    reward: accountsKeys[accounts.indexOf('reward')],
    rewardMint: accountsKeys[accounts.indexOf('rewardMint')],
    receiverVault: accountsKeys[accounts.indexOf('receiverVault')],
    rewardVault: accountsKeys[accounts.indexOf('rewardVault')],
    ...result,
  }
}

export type AcceptAccessInfo = {
  signer: string
  receiver: string
  marketplace: string
  request: string
  accessMint: string
  accessVault: string
  rent: string
}
export type AirdropAccessInfo = {
  signer: string
  receiver: string
  marketplace: string
  accessMint: string
  accessVault: string
  rent: string
}
export type EditProductInfo = {
  signer: string
  product: string
  marketplace: string
  paymentMint: string
  productPrice: BN
}
export type EditMarketplaceInfo = {
  signer: string
  marketplace: string
  rewardMint: string
  discountMint: string
  params: EditMarketplaceParams
}
export type InitBountyInfo = {
  signer: string
  marketplace: string
  rewardMint: string
  bountyVault: string
  rent: string
}
export type InitMarketplaceInfo = {
  signer: string
  marketplace: string
  accessMint: string
  rewardMint: string
  discountMint: string
  bountyVault: string
  rent: string
  params: InitMarketplaceParams
}
export type InitProductTreeInfo = {
  signer: string
  marketplace: string
  product: string
  productMint: string
  paymentMint: string
  accessMint: string
  productMintVault: string
  accessVault: string
  masterEdition: string
  metadata: string
  merkleTree: string
  treeAuthority: string
  rent: string
  logWrapper: string
  params: InitProductTreeParams
}
export type InitProductInfo = {
  signer: string
  marketplace: string
  product: string
  productMint: string
  paymentMint: string
  accessMint: string
  accessVault: string
  rent: string
  params: InitProductParams
}
export type InitRewardVaultInfo = {
  signer: string
  marketplace: string
  reward: string
  rewardMint: string
  rewardVault: string
  rent: string
}
export type InitRewardInfo = {
  signer: string
  marketplace: string
  reward: string
  rewardMint: string
  rewardVault: string
  rent: string
}
export type RegisterBuyCnftInfo = {
  signer: string
  seller: string
  marketplaceAuth: string
  marketplace: string
  product: string
  paymentMint: string
  productMint: string
  buyerTransferVault: string
  sellerTransferVault: string
  marketplaceTransferVault: string
  bountyVault: string
  sellerReward: string
  sellerRewardVault: string
  buyerReward: string
  buyerRewardVault: string
  metadata: string
  masterEdition: string
  treeAuthority: string
  bubblegumSigner: string
  merkleTree: string
  rent: string
  logWrapper: string
  params: RegisterBuyCnftParams
}
export type RegisterBuyFungibleInfo = {
  signer: string
  seller: string
  marketplaceAuth: string
  marketplace: string
  product: string
  productMint: string
  paymentMint: string
  buyerTokenVault: string
  buyerTransferVault: string
  sellerTransferVault: string
  marketplaceTransferVault: string
  bountyVault: string
  sellerReward: string
  sellerRewardVault: string
  buyerReward: string
  buyerRewardVault: string
  amount: number
}
export type RegisterBuyInfo = {
  signer: string
  seller: string
  marketplaceAuth: string
  marketplace: string
  product: string
  paymentMint: string
  buyerTransferVault: string
  sellerTransferVault: string
  marketplaceTransferVault: string
  bountyVault: string
  sellerReward: string
  sellerRewardVault: string
  buyerReward: string
  buyerRewardVault: string
  rent: string
  amount: number
}
export type RequestAccessInfo = {
  signer: string
  marketplace: string
  request: string
  rent: string
}
export type UpdateTreeInfo = {
  payer: string
  signer: string
  marketplace: string
  product: string
  treeAuthority: string
  merkleTree: string
  logWrapper: string
  params: UpdateProductTreeParams
}
export type WithdrawRewardInfo = {
  signer: string
  marketplace: string
  reward: string
  rewardMint: string
  receiverVault: string
  rewardVault: string
}
