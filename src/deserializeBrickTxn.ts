import { Connection, PartiallyDecodedInstruction } from "@solana/web3.js"
import * as beet from '@metaplex-foundation/beet'
import bs58 from "bs58"
import { IX_ACCOUNTS_LAYOUT, IX_METHOD_CODE, InstructionType } from "./utils/solita/brick/instructions.js"

export type BuyTokenInstructionArgs = {
    timestamp: beet.bignum
  }
export const buyTokenStruct = new beet.BeetArgsStruct<
  BuyTokenInstructionArgs & {
    instructionDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['timestamp', beet.u64],
  ],
  'BuyTokenInstructionArgs',
)

function getDiscriminator(data: Buffer): any {
    try {
      const [context] = buyTokenStruct.deserialize(data)
      const { instructionDiscriminator } = context

      return instructionDiscriminator
    } catch (e) {
      console.error(e)
    }
}

function parseInstructionAccounts(
    type: InstructionType,
    rawIx: PartiallyDecodedInstruction,
): any {
    const info: any = {}

    const template = IX_ACCOUNTS_LAYOUT[type]
    if (!template) return {}

    if ('accounts' in rawIx) {
      for (const [index, name] of IX_ACCOUNTS_LAYOUT[type].entries()) {
        info[name] = rawIx.accounts[index]
      }
    }

    return info
}

export async function deserializeTransaction(sig: string) {
    const connection: Connection = new Connection(process.env.rpc || '');
    const transaction = await connection.getParsedTransaction(sig, {
        commitment: 'finalized',
        maxSupportedTransactionVersion: 0,
    })
    
    if (transaction && transaction.meta?.innerInstructions) {
        console.log(transaction.meta.innerInstructions)
        for (const ix of transaction.transaction.message.instructions) {
            const auxIx = ix as PartiallyDecodedInstruction
            const discriminator = getDiscriminator(Buffer.from(bs58.decode(auxIx.data)))
            const type = IX_METHOD_CODE.get(discriminator.toString('ascii'))
            if (type) console.log(parseInstructionAccounts(type, auxIx))
        }
    }
}