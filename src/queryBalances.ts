import { Connection, PublicKey } from '@solana/web3.js'
import fetch from 'node-fetch'

const connection = new Connection('https://solrpc3.aleph.cloud/riki', );

async function queryBalancesFromGraphQL() {
  const query = {
    query: `
      {
        balances(blockchain: "solana") {
          account
          balance
          balanceNum
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
  return json.data.balances
}

async function queryAccountState() {
  const query = {
    query: `
      {
        accountState(blockchain: "solana", type: transaction) {
          account
          progress
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
  return json.data.accountState
    .filter((data: any) => data !== null && data.progress === 100)
    .map((data: any) => data.account)
}

async function fetchRealSolanaBalance(account: string) {
  const publicKey = new PublicKey(account)
  try {
    const balance = await connection.getTokenAccountBalance(publicKey)
    return balance.value.amount
  } catch(e) {
    return 0
  }
}

async function validateBalances() {
    const balances = await queryBalancesFromGraphQL()
    const indexedAccounts: string[] = await queryAccountState()

    const checkedAccounts: string[] = []
    let matchCount = 0

    for (const balanceInfo of balances) {
      const { account, balance } = balanceInfo
      if (!indexedAccounts.includes(account)) continue
      
      checkedAccounts.push(account)
      const realBalance = await fetchRealSolanaBalance(account)
      if (realBalance !== balance) {
          console.log(`Balance mismatch for account ${account} GraphQL: ${balance}, Solana: ${realBalance}`)
      } else {
          matchCount++
      }
    }

    const notCheckedAccounts = indexedAccounts.filter(account => !checkedAccounts.includes(account));
    for (const account of notCheckedAccounts) {      
      const realBalance = await fetchRealSolanaBalance(account)
      if (realBalance == 0) {
        matchCount++
      } else {
        console.log(`Balance mismatch for account ${account} GraphQL: 0, Solana: ${realBalance}`)
      }
    }
  
    const totalAccounts = indexedAccounts.length
    const matchPercentage = (matchCount / totalAccounts) * 100
    console.log(`Indexed token accounts: ${totalAccounts}`)
    console.log(`Correct balances: ${matchCount}`)
    console.log(`Indexer accuracy: ${matchPercentage.toFixed(2)}%`)
}

validateBalances()
