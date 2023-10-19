export * from './Access'
export * from './Marketplace'
export * from './Product'
export * from './Reward'

import { Marketplace } from './Marketplace'
import { Product } from './Product'
import { Reward } from './Reward'
import { Access } from './Access'

export const accountProviders = { Marketplace, Product, Reward, Access }
