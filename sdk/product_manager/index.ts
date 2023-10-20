import { ProductManagerParser } from './parser/index.js'
import { ProductManagerTransactionBuilder } from './transaction-builder/index.js'
export class ProductManager {
  public parser = ProductManagerParser
  public transacionBuilder = ProductManagerTransactionBuilder
}
