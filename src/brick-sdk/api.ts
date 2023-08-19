import { queryAccounts, queryEvents, querySales, AccountType } from "brick-protocol"

export async function queryAccount() {
    const filters = {
        types: [AccountType.Marketplace]
    }
    const accounts = await queryAccounts('http://localhost:8080', filters)
    accounts.map((account) => { console.log(account.data)} )
}

//queryAccount();

export async function queryEvent() {
    const filters = {
        account: "5WnQLqDpc35PodFDBH6ZAWzDonvt4SF9R9wHq7mhMBG"
    }
    const events = await queryEvents('http://localhost:8080', filters)
    events.map((events) => { console.log(events.info)} )
}

//queryEvent();

async function querySale() {
    const filters = {
        seller: "rikiFB2VznT2izUT7UffzWCn1X4gNmGutX7XEqFdpRR",
    }
    const events = await querySales('http://localhost:8080', filters)
    events.map((events) => { console.log(events.info)} )
}

querySale();