import {
  IX_ACCOUNTS_LAYOUT,
  IX_DATA_LAYOUT,
  InstructionType,
} from '../layout/instructions.js'

import BN from 'bn.js'

export const instructionParsers = {
  [InstructionType.InitProduct]: parseInitProduct,
  [InstructionType.EscrowPay]: parseEscrowPay,
  [InstructionType.DirectPay]: parseDirectPay,
  [InstructionType.Accept]: parseAccept,
  [InstructionType.Deny]: parseDeny,
  [InstructionType.RecoverFunds]: parseRecoverFunds,
}

function parseInitProduct(
  instructionData: Buffer,
  accountsKeys: string[],
): InitProductInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.InitProduct]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.InitProduct].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    product: accountsKeys[accounts.indexOf('product')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseEscrowPay(
  instructionData: Buffer,
  accountsKeys: string[],
): EscrowPayInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.EscrowPay]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.EscrowPay].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    product: accountsKeys[accounts.indexOf('product')],
    escrow: accountsKeys[accounts.indexOf('escrow')],
    escrowVault: accountsKeys[accounts.indexOf('escrowVault')],
    transferVault: accountsKeys[accounts.indexOf('transferVault')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    rent: accountsKeys[accounts.indexOf('rent')],
    ...result,
  }
}
function parseDirectPay(
  instructionData: Buffer,
  accountsKeys: string[],
): DirectPayInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.DirectPay]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.DirectPay].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    product: accountsKeys[accounts.indexOf('product')],
    from: accountsKeys[accounts.indexOf('from')],
    to: accountsKeys[accounts.indexOf('to')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}
function parseAccept(
  instructionData: Buffer,
  accountsKeys: string[],
): AcceptInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.Accept]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.Accept].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    buyer: accountsKeys[accounts.indexOf('buyer')],
    escrow: accountsKeys[accounts.indexOf('escrow')],
    product: accountsKeys[accounts.indexOf('product')],
    escrowVault: accountsKeys[accounts.indexOf('escrowVault')],
    transferVault: accountsKeys[accounts.indexOf('transferVault')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}
function parseDeny(instructionData: Buffer, accountsKeys: string[]): DenyInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.Deny]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.Deny].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    buyer: accountsKeys[accounts.indexOf('buyer')],
    escrow: accountsKeys[accounts.indexOf('escrow')],
    product: accountsKeys[accounts.indexOf('product')],
    escrowVault: accountsKeys[accounts.indexOf('escrowVault')],
    transferVault: accountsKeys[accounts.indexOf('transferVault')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}
function parseRecoverFunds(
  instructionData: Buffer,
  accountsKeys: string[],
): RecoverFundsInfo {
  const accounts = IX_ACCOUNTS_LAYOUT[InstructionType.RecoverFunds]
  const [context] =
    IX_DATA_LAYOUT[InstructionType.RecoverFunds].deserialize(instructionData)
  const { ...result } = context

  return {
    signer: accountsKeys[accounts.indexOf('signer')],
    seller: accountsKeys[accounts.indexOf('seller')],
    escrow: accountsKeys[accounts.indexOf('escrow')],
    product: accountsKeys[accounts.indexOf('product')],
    escrowVault: accountsKeys[accounts.indexOf('escrowVault')],
    transferVault: accountsKeys[accounts.indexOf('transferVault')],
    paymentMint: accountsKeys[accounts.indexOf('paymentMint')],
    ...result,
  }
}

export type InitProductInfo = {
  signer: string
  product: string
  paymentMint: string
  rent: string
  id: any
  price: BN
}
export type EscrowPayInfo = {
  signer: string
  seller: string
  product: string
  escrow: string
  escrowVault: string
  transferVault: string
  paymentMint: string
  rent: string
  productAmount: BN
  expireTime: BN
}
export type DirectPayInfo = {
  signer: string
  seller: string
  product: string
  from: string
  to: string
  paymentMint: string
  productAmount: BN
}
export type AcceptInfo = {
  signer: string
  buyer: string
  escrow: string
  product: string
  escrowVault: string
  transferVault: string
  paymentMint: string
}
export type DenyInfo = {
  signer: string
  buyer: string
  escrow: string
  product: string
  escrowVault: string
  transferVault: string
  paymentMint: string
}
export type RecoverFundsInfo = {
  signer: string
  seller: string
  escrow: string
  product: string
  escrowVault: string
  transferVault: string
  paymentMint: string
}
