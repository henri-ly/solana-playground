import { createInitProductTransaction } from './initProduct'
import { createEscrowPayTransaction } from './escrowPay'
import { createDirectPayTransaction } from './directPay'
import { createAcceptTransaction } from './accept'
import { createDenyTransaction } from './deny'
import { createRecoverFundsTransaction } from './recoverFunds'
import { InstructionType } from '../layout/instructions'

export const ProductManagerTransactionBuilder = {
  [InstructionType.InitProduct]: createInitProductTransaction,
  [InstructionType.EscrowPay]: createEscrowPayTransaction,
  [InstructionType.DirectPay]: createDirectPayTransaction,
  [InstructionType.Accept]: createAcceptTransaction,
  [InstructionType.Deny]: createDenyTransaction,
  [InstructionType.RecoverFunds]: createRecoverFundsTransaction,
}
