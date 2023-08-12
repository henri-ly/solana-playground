import { createMint, getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token"
import { Keypair, Connection, clusterApiUrl } from '@solana/web3.js'
import { performAirdrop } from "./utils/requestAirdrop.js"

export async function createTokenMint() {
    const payer = Keypair.generate()
    const mintAuthority = Keypair.generate()
    const freezeAuthority = Keypair.generate()
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')

    await performAirdrop(connection, payer.publicKey)

    const mint = await createMint(connection, payer, mintAuthority.publicKey, freezeAuthority.publicKey, 0)
    console.log('Mint PublicKey: ', mint.toString())

    let mintInfo = await getMint(connection, mint)
    console.log('Token supply: ', mintInfo.supply)

    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, payer.publicKey)

    await mintTo(connection, payer, mint, tokenAccount.address, mintAuthority, 21000000)

    const tokenAccountInfo = await getAccount(connection, tokenAccount.address)
    console.log('Token account amount: ', tokenAccountInfo.amount)

    mintInfo = await getMint(connection, mint)
    console.log('Token supply: ', mintInfo.supply)
}

await createTokenMint()
