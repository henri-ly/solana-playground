import { ASSOCIATED_TOKEN_PROGRAM_ID, AccountLayout, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token"
import { Connection, PublicKey } from "@solana/web3.js"

const transferInfo = {
    amount: '196833643078140',
    authority: '6ZRCB7AAqGre6c72PRz3MHLC73VMYvJ8bi9KHf1HFpNk',
    destination: 'EhUbE9nEzQKMMhP23fPbSE9uPqp1if5fTtrdLd8iFwDZ',
    source: '341LwarVojT1g5xMgrRYLuQ4G5oxXMSH3uEe88zu1jZ4'
}

async function validateAtaMint(info: any) {
    const alephPubkey = new PublicKey('3UCMiSnkcnkPE1pgQ5ggPCBv6dXgVUy16TmMUe1WpG9x')
    const connection = new Connection("https://solrpc3.aleph.cloud/riki");
    const ataAddress = new PublicKey(info.source);

    const accountInfo = await connection.getAccountInfo(ataAddress);
    if (accountInfo && accountInfo.data) {
        const tokenAccountInfo = AccountLayout.decode(accountInfo.data);
        if (tokenAccountInfo.mint.equals(alephPubkey)) {
            console.log("The ATA is associated with the expected mint.");
            console.log(tokenAccountInfo.owner.toString())
            // we get also the program derived addresses that could receive/hold tokens
            const expectedAta = getAssociatedTokenAddressSync(alephPubkey, tokenAccountInfo.owner, true, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
            console.log(expectedAta.toString(), info.source)
            console.log(expectedAta.toString() === info.source)
        } else {
            console.log("The ATA is not associated with the expected mint.");
        }
    } else {
        console.log("Account info not found or unable to deserialize.");
    }
}

validateAtaMint(transferInfo)