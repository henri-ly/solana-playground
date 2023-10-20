import { instructionParsers } from './instructions'
import { getInstructionType } from '../layout/instructions'
import { accountParsers } from './accounts'
import { getAccountType } from '../layout/accounts'

export const ProductManagerParser = {
  instructionParsers,
  getInstructionType,
  accountParsers,
  getAccountType,
}
