import {
  acceptAccessInstructionDiscriminator,
  acceptAccessStruct,
  airdropAccessInstructionDiscriminator,
  airdropAccessStruct,
  editProductInstructionDiscriminator,
  editProductStruct,
  editMarketplaceInstructionDiscriminator,
  editMarketplaceStruct,
  initBountyInstructionDiscriminator,
  initBountyStruct,
  initMarketplaceInstructionDiscriminator,
  initMarketplaceStruct,
  initProductTreeInstructionDiscriminator,
  initProductTreeStruct,
  initProductInstructionDiscriminator,
  initProductStruct,
  initRewardVaultInstructionDiscriminator,
  initRewardVaultStruct,
  initRewardInstructionDiscriminator,
  initRewardStruct,
  registerBuyCnftInstructionDiscriminator,
  registerBuyCnftStruct,
  registerBuyFungibleInstructionDiscriminator,
  registerBuyFungibleStruct,
  registerBuyInstructionDiscriminator,
  registerBuyStruct,
  requestAccessInstructionDiscriminator,
  requestAccessStruct,
  updateTreeInstructionDiscriminator,
  updateTreeStruct,
  withdrawRewardInstructionDiscriminator,
  withdrawRewardStruct,
} from '../utils/instructions/index.js'

export enum InstructionType {
  AcceptAccess = 'AcceptAccess',
  AirdropAccess = 'AirdropAccess',
  EditProduct = 'EditProduct',
  EditMarketplace = 'EditMarketplace',
  InitBounty = 'InitBounty',
  InitMarketplace = 'InitMarketplace',
  InitProductTree = 'InitProductTree',
  InitProduct = 'InitProduct',
  InitRewardVault = 'InitRewardVault',
  InitReward = 'InitReward',
  RegisterBuyCnft = 'RegisterBuyCnft',
  RegisterBuyFungible = 'RegisterBuyFungible',
  RegisterBuy = 'RegisterBuy',
  RequestAccess = 'RequestAccess',
  UpdateTree = 'UpdateTree',
  WithdrawReward = 'WithdrawReward',
}

export function getInstructionType(data: Buffer): InstructionType | undefined {
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8)
  return IX_DISCRIMINATORS[discriminator.toString('ascii')]
}

export const acceptAccessAccounts = [
  'signer',
  'receiver',
  'marketplace',
  'request',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const airdropAccessAccounts = [
  'signer',
  'receiver',
  'marketplace',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const editProductAccounts = [
  'signer',
  'product',
  'marketplace',
  'paymentMint',
]
export const editMarketplaceAccounts = [
  'signer',
  'marketplace',
  'rewardMint',
  'discountMint',
]
export const initBountyAccounts = [
  'signer',
  'marketplace',
  'rewardMint',
  'bountyVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const initMarketplaceAccounts = [
  'signer',
  'marketplace',
  'accessMint',
  'rewardMint',
  'discountMint',
  'bountyVault',
  'rent',
  'systemProgram',
  'tokenProgram2022',
  'tokenProgram',
]
export const initProductTreeAccounts = [
  'signer',
  'marketplace',
  'product',
  'productMint',
  'paymentMint',
  'accessMint',
  'productMintVault',
  'accessVault',
  'masterEdition',
  'metadata',
  'merkleTree',
  'treeAuthority',
  'rent',
  'tokenMetadataProgram',
  'logWrapper',
  'bubblegumProgram',
  'compressionProgram',
  'tokenProgram',
  'associatedTokenProgram',
  'systemProgram',
]
export const initProductAccounts = [
  'signer',
  'marketplace',
  'product',
  'productMint',
  'paymentMint',
  'accessMint',
  'accessVault',
  'rent',
  'systemProgram',
  'tokenProgram',
]
export const initRewardVaultAccounts = [
  'signer',
  'marketplace',
  'reward',
  'rewardMint',
  'rewardVault',
  'rent',
  'systemProgram',
  'tokenProgram',
  'associatedTokenProgram',
]
export const initRewardAccounts = [
  'signer',
  'marketplace',
  'reward',
  'rewardMint',
  'rewardVault',
  'rent',
  'systemProgram',
  'tokenProgram',
]
export const registerBuyCnftAccounts = [
  'signer',
  'seller',
  'marketplaceAuth',
  'marketplace',
  'product',
  'paymentMint',
  'productMint',
  'buyerTransferVault',
  'sellerTransferVault',
  'marketplaceTransferVault',
  'bountyVault',
  'sellerReward',
  'sellerRewardVault',
  'buyerReward',
  'buyerRewardVault',
  'metadata',
  'masterEdition',
  'treeAuthority',
  'bubblegumSigner',
  'merkleTree',
  'systemProgram',
  'tokenProgram',
  'rent',
  'logWrapper',
  'bubblegumProgram',
  'compressionProgram',
  'tokenMetadataProgram',
]
export const registerBuyFungibleAccounts = [
  'signer',
  'seller',
  'marketplaceAuth',
  'marketplace',
  'product',
  'productMint',
  'paymentMint',
  'buyerTokenVault',
  'buyerTransferVault',
  'sellerTransferVault',
  'marketplaceTransferVault',
  'bountyVault',
  'sellerReward',
  'sellerRewardVault',
  'buyerReward',
  'buyerRewardVault',
  'systemProgram',
  'tokenProgram',
]
export const registerBuyAccounts = [
  'signer',
  'seller',
  'marketplaceAuth',
  'marketplace',
  'product',
  'paymentMint',
  'buyerTransferVault',
  'sellerTransferVault',
  'marketplaceTransferVault',
  'bountyVault',
  'sellerReward',
  'sellerRewardVault',
  'buyerReward',
  'buyerRewardVault',
  'systemProgram',
  'tokenProgram',
  'rent',
]
export const requestAccessAccounts = [
  'signer',
  'marketplace',
  'request',
  'rent',
  'systemProgram',
]
export const updateTreeAccounts = [
  'payer',
  'signer',
  'marketplace',
  'product',
  'treeAuthority',
  'merkleTree',
  'logWrapper',
  'systemProgram',
  'bubblegumProgram',
  'compressionProgram',
]
export const withdrawRewardAccounts = [
  'signer',
  'marketplace',
  'reward',
  'rewardMint',
  'receiverVault',
  'rewardVault',
  'tokenProgram',
]

const IX_DISCRIMINATORS = {
  [Buffer.from(acceptAccessInstructionDiscriminator).toString('ascii')]:
    InstructionType.AcceptAccess,
  [Buffer.from(airdropAccessInstructionDiscriminator).toString('ascii')]:
    InstructionType.AirdropAccess,
  [Buffer.from(editProductInstructionDiscriminator).toString('ascii')]:
    InstructionType.EditProduct,
  [Buffer.from(editMarketplaceInstructionDiscriminator).toString('ascii')]:
    InstructionType.EditMarketplace,
  [Buffer.from(initBountyInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitBounty,
  [Buffer.from(initMarketplaceInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitMarketplace,
  [Buffer.from(initProductTreeInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitProductTree,
  [Buffer.from(initProductInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitProduct,
  [Buffer.from(initRewardVaultInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitRewardVault,
  [Buffer.from(initRewardInstructionDiscriminator).toString('ascii')]:
    InstructionType.InitReward,
  [Buffer.from(registerBuyCnftInstructionDiscriminator).toString('ascii')]:
    InstructionType.RegisterBuyCnft,
  [Buffer.from(registerBuyFungibleInstructionDiscriminator).toString('ascii')]:
    InstructionType.RegisterBuyFungible,
  [Buffer.from(registerBuyInstructionDiscriminator).toString('ascii')]:
    InstructionType.RegisterBuy,
  [Buffer.from(requestAccessInstructionDiscriminator).toString('ascii')]:
    InstructionType.RequestAccess,
  [Buffer.from(updateTreeInstructionDiscriminator).toString('ascii')]:
    InstructionType.UpdateTree,
  [Buffer.from(withdrawRewardInstructionDiscriminator).toString('ascii')]:
    InstructionType.WithdrawReward,
}

export const IX_DATA_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.AcceptAccess]: acceptAccessStruct,
  [InstructionType.AirdropAccess]: airdropAccessStruct,
  [InstructionType.EditProduct]: editProductStruct,
  [InstructionType.EditMarketplace]: editMarketplaceStruct,
  [InstructionType.InitBounty]: initBountyStruct,
  [InstructionType.InitMarketplace]: initMarketplaceStruct,
  [InstructionType.InitProductTree]: initProductTreeStruct,
  [InstructionType.InitProduct]: initProductStruct,
  [InstructionType.InitRewardVault]: initRewardVaultStruct,
  [InstructionType.InitReward]: initRewardStruct,
  [InstructionType.RegisterBuyCnft]: registerBuyCnftStruct,
  [InstructionType.RegisterBuyFungible]: registerBuyFungibleStruct,
  [InstructionType.RegisterBuy]: registerBuyStruct,
  [InstructionType.RequestAccess]: requestAccessStruct,
  [InstructionType.UpdateTree]: updateTreeStruct,
  [InstructionType.WithdrawReward]: withdrawRewardStruct,
}

export const IX_ACCOUNTS_LAYOUT: Partial<Record<InstructionType, any>> = {
  [InstructionType.AcceptAccess]: acceptAccessAccounts,
  [InstructionType.AirdropAccess]: airdropAccessAccounts,
  [InstructionType.EditProduct]: editProductAccounts,
  [InstructionType.EditMarketplace]: editMarketplaceAccounts,
  [InstructionType.InitBounty]: initBountyAccounts,
  [InstructionType.InitMarketplace]: initMarketplaceAccounts,
  [InstructionType.InitProductTree]: initProductTreeAccounts,
  [InstructionType.InitProduct]: initProductAccounts,
  [InstructionType.InitRewardVault]: initRewardVaultAccounts,
  [InstructionType.InitReward]: initRewardAccounts,
  [InstructionType.RegisterBuyCnft]: registerBuyCnftAccounts,
  [InstructionType.RegisterBuyFungible]: registerBuyFungibleAccounts,
  [InstructionType.RegisterBuy]: registerBuyAccounts,
  [InstructionType.RequestAccess]: requestAccessAccounts,
  [InstructionType.UpdateTree]: updateTreeAccounts,
  [InstructionType.WithdrawReward]: withdrawRewardAccounts,
}
