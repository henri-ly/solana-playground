import { instructionParsers } from './instructions.js'
import { getInstructionType } from '../layout/instructions.js'
import { accountParsers } from './accounts.js'
import { getAccountType } from '../layout/accounts.js'

export const MarketplaceManagerParser = {
  instructionParsers,
  getInstructionType,
  accountParsers,
  getAccountType,
}
