import { createAcceptAccessTransaction } from './acceptAccess'
import { createAirdropAccessTransaction } from './airdropAccess'
import { createEditMarketplaceTransaction } from './editMarketplace'
import { createEditProductTransaction } from './editProduct'
import { createInitBountyTransaction } from './initBounty'
import { createInitMarketplaceTransaction } from './initMarketplace'
import { createInitProductTransaction } from './initProduct'
import { createRegisterBuyTransaction } from './registerBuy'
import { InstructionType } from '../layout/instructions'

export const MarketplaceManagerTransactionBuilder = {
  [InstructionType.AcceptAccess]: createAcceptAccessTransaction,
  [InstructionType.AirdropAccess]: createAirdropAccessTransaction,
  [InstructionType.EditMarketplace]: createEditMarketplaceTransaction,
  [InstructionType.EditProduct]: createEditProductTransaction,
  [InstructionType.InitBounty]: createInitBountyTransaction,
  [InstructionType.InitMarketplace]: createInitMarketplaceTransaction,
  [InstructionType.InitProduct]: createInitProductTransaction,
  [InstructionType.RegisterBuy]: createRegisterBuyTransaction,
}
