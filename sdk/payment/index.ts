import { PaymentParser } from './parser/index.js'
import { PaymentTransactionBuilder } from './transaction-builder/index.js'
export class Payment {
  public parser = PaymentParser
  public transacionBuilder = PaymentTransactionBuilder
}
