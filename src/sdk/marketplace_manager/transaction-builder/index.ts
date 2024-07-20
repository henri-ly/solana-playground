import { createAcceptAccessTransaction } from './acceptAccess.js'
import { createAirdropAccessInstruction } from './airdropAccess.js'
import { createEditMarketplaceTransaction } from './editMarketplace.js'
import { createEditProductTransaction } from './editProduct.js'
import { createInitBountyTransaction } from './initBounty.js'
import { createInitMarketplaceTransaction } from './initMarketplace.js'
import { createInitProductTransaction } from './initProduct.js'
import { createRegisterBuyTransaction } from './registerBuy.js'
import { InstructionType } from '../layout/instructions.js'

export const MarketplaceManagerTransactionBuilder = {
  [InstructionType.AcceptAccess]: createAcceptAccessTransaction,
  [InstructionType.AirdropAccess]: createAirdropAccessInstruction,
  [InstructionType.EditMarketplace]: createEditMarketplaceTransaction,
  [InstructionType.EditProduct]: createEditProductTransaction,
  [InstructionType.InitBounty]: createInitBountyTransaction,
  [InstructionType.InitMarketplace]: createInitMarketplaceTransaction,
  [InstructionType.InitProduct]: createInitProductTransaction,
  [InstructionType.RegisterBuy]: createRegisterBuyTransaction,
}
