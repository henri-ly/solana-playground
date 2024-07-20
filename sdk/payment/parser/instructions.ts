import {
  IX_ACCOUNTS_LAYOUT,
  IX_DATA_LAYOUT,
  InstructionType,
} from '../layout/instructions.js'

import BN from 'bn.js'

export const instructionParsers = {
  [InstructionType.Pay]: parsePay,
}

function parsePay(instructionData: Buffer, accountsKeys: string[]): PayInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.Pay]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.Pay].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    mint: accountsKeys[accounts.indexOf('mint')],
    buyerVault: accountsKeys[accounts.indexOf('buyerVault')],
    sellerVault: accountsKeys[accounts.indexOf('sellerVault')],
    index: accountsKeys[accounts.indexOf('index')],
    ...result,
  }
}

export type PayInfo = {
  signer: string
  mint: string
  buyerVault: string
  sellerVault: string
  index: string
  amount: BN
  decimals: any
}
