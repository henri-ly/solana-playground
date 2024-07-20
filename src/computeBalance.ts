import fetch from 'node-fetch';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://solrpc3.aleph.cloud/riki', );

async function fetchTransactions(pubkey: PublicKey) {
  const signatureResponse = await connection.getSignaturesForAddress(pubkey)
  const signatures = signatureResponse.map(x => x.signature)
  const transactions = await connection.getParsedTransactions(signatures, { commitment: 'confirmed' })
  return transactions.filter(tx => tx !== null)
}

async function queryIndexedEvents(account: string) {
  const query = {
    query: `
      {
        events(blockchain: "solana", account: "${account}") {
          transaction
          valueNum
          from
          to
        }
      }
    `,
  }

  const response = await fetch('http://localhost:8083/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })

  const json = await response.json() as any
  return json.data.events
}

async function analyzeAccount(account: string) {
  const accountPubkey = new PublicKey(account)
  const solanaBalance = await connection.getBalance(accountPubkey)
  const [onChainTransactions, indexedEvents] = await Promise.all([
    fetchTransactions(accountPubkey),
    queryIndexedEvents(account),
  ])

  let balance = 0
  indexedEvents.forEach((event: any) => {
    if (event.to === account) {
      balance += event.valueNum
    } else if (event.from === account) {
      balance -= event.valueNum
    }
  })

  const onChainSignatures = new Set(onChainTransactions.map((tx: any) => tx.transaction.signatures[0]))
  console.log('OnChainSignatures size:', onChainSignatures.size)
  console.log('IndexedEvents length:', indexedEvents.length)
  const indexedSignatures = new Set(indexedEvents.map((event: any) => event.transaction))
  const notIndexedTransactions = [...onChainSignatures].filter(signature => !indexedSignatures.has(signature))

  return { solanaBalance, balance, notIndexedTransactions }
}

const account = '6ao8he4wPVBmg1X976HUmJZ3fYXn1KPsdPTLa7aco9fu'
analyzeAccount(account)
  .then(({ solanaBalance, balance, notIndexedTransactions }) => {
    console.log(`${account} with balance ${solanaBalance} and indexer computed ${balance}`)
    console.log(`Not indexed transactions:`, notIndexedTransactions)
  })
  .catch(error => console.error(error))
