import { createPayTransaction } from './pay'
import { InstructionType } from '../layout/instructions'

export const PaymentTransactionBuilder = {
  [InstructionType.Pay]: createPayTransaction,
}
