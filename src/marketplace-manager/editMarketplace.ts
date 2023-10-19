import { EditMarketplaceInstructionAccounts, EditMarketplaceInstructionArgs, PaymentFeePayer, createEditMarketplaceInstruction } from "../utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { BRICK_PROGRAM_ID_PK, FNET_MINT } from "../constants.js";
import dotenv from 'dotenv';
dotenv.config();

async function editMarketplace() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const [marketplacePubkey] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("marketplace", "utf-8"),
          signer.publicKey.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );

    const accounts: EditMarketplaceInstructionAccounts = {
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        rewardMint: FNET_MINT,
        discountMint: FNET_MINT,
    };

    const args: EditMarketplaceInstructionArgs = {
        params: {
            fee: 0,
            feeReduction: 0,
            sellerReward: 0,
            buyerReward: 0,
            useCnfts: true,
            deliverToken: false,
            transferable: false,
            chainCounter: false,
            permissionless: true,
            rewardsEnabled: false,
            feePayer: PaymentFeePayer.Buyer,
        }
    };
    const editMarketIx = createEditMarketplaceInstruction(accounts, args);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    const messageV0 = new TransactionMessage({
        payerKey: signer.publicKey,
        recentBlockhash: blockhash,
        instructions: [editMarketIx],
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([signer]);
    const txid = await connection.sendTransaction(transaction);
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=mainnet`);

    await connection.sendRawTransaction(transaction.serialize())
}

editMarketplace();