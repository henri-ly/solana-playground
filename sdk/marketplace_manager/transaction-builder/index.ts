import { createAcceptAccessTransaction } from './acceptAccess'
import { createAirdropAccessTransaction } from './airdropAccess'
import { createEditProductTransaction } from './editProduct'
import { createEditMarketplaceTransaction } from './editMarketplace'
import { createInitBountyTransaction } from './initBounty'
import { createInitMarketplaceTransaction } from './initMarketplace'
import { createInitProductTreeTransaction } from './initProductTree'
import { createInitProductTransaction } from './initProduct'
import { createInitRewardVaultTransaction } from './initRewardVault'
import { createInitRewardTransaction } from './initReward'
import { createRegisterBuyCnftTransaction } from './registerBuyCnft'
import { createRegisterBuyFungibleTransaction } from './registerBuyFungible'
import { createRegisterBuyTransaction } from './registerBuy'
import { createRequestAccessTransaction } from './requestAccess'
import { createUpdateTreeTransaction } from './updateTree'
import { createWithdrawRewardTransaction } from './withdrawReward'
import { InstructionType } from '../layout/instructions'

export const MarketplaceManagerTransactionBuilder = {
  [InstructionType.AcceptAccess]: createAcceptAccessTransaction,
  [InstructionType.AirdropAccess]: createAirdropAccessTransaction,
  [InstructionType.EditProduct]: createEditProductTransaction,
  [InstructionType.EditMarketplace]: createEditMarketplaceTransaction,
  [InstructionType.InitBounty]: createInitBountyTransaction,
  [InstructionType.InitMarketplace]: createInitMarketplaceTransaction,
  [InstructionType.InitProductTree]: createInitProductTreeTransaction,
  [InstructionType.InitProduct]: createInitProductTransaction,
  [InstructionType.InitRewardVault]: createInitRewardVaultTransaction,
  [InstructionType.InitReward]: createInitRewardTransaction,
  [InstructionType.RegisterBuyCnft]: createRegisterBuyCnftTransaction,
  [InstructionType.RegisterBuyFungible]: createRegisterBuyFungibleTransaction,
  [InstructionType.RegisterBuy]: createRegisterBuyTransaction,
  [InstructionType.RequestAccess]: createRequestAccessTransaction,
  [InstructionType.UpdateTree]: createUpdateTreeTransaction,
  [InstructionType.WithdrawReward]: createWithdrawRewardTransaction,
}
