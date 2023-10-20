import { ACCOUNTS_DATA_LAYOUT, AccountType } from '../layout/accounts.js'

export const accountParsers = {
  [AccountType.Product]: parseProduct,
  [AccountType.Escrow]: parseEscrow,
}

function parseProduct(accountData: Buffer): ProductInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Product].deserialize(accountData)[0]
}

function parseEscrow(accountData: Buffer): EscrowInfo {
  return ACCOUNTS_DATA_LAYOUT[AccountType.Escrow].deserialize(accountData)[0]
}

export type ProductInfo = {
  id: any
  authority: string
  paymentMint: string
  price: any
  bump: number
}

export type EscrowInfo = {
  payer: string
  receiver: string
  product: string
  productAmount: any
  expireTime: BN
  vaultBump: number
  bump: number
}
