import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { Connection, PublicKey } from "@solana/web3.js"

const connection = new Connection('https://solrpc3.aleph.cloud/riki')
export async function getTokenHolders() {
    const response = await connection.getProgramAccounts(
        TOKEN_PROGRAM_ID, {
        dataSlice: {
            offset: 32,
            length: 32,
        },
        filters: [
          {
            dataSize: 165
          },
          {
            memcmp: {
              offset: 0,
              bytes: '3UCMiSnkcnkPE1pgQ5ggPCBv6dXgVUy16TmMUe1WpG9x'
            }
          }
        ]
      })
      const accounts = response.map((accountResponse) => {
        const owner = new PublicKey(accountResponse.account.data);

        return {
          address: accountResponse.pubkey.toString(),
          owner: owner.toString(),
        }
      })
      console.log('Discovered atas', accounts.length, accounts[0].owner)
}

await getTokenHolders()
