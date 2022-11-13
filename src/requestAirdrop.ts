import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"

export async function performAirdrop(connection: Connection, pubkey: PublicKey) {
    const airdropSignature = await connection.requestAirdrop(pubkey, LAMPORTS_PER_SOL)
    console.log(airdropSignature)

    const latestBlockHash = await connection.getLatestBlockhash()
    await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: airdropSignature,
      })
}