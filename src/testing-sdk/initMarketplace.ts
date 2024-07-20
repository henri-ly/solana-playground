import { MarketplaceManager } from "../sdk/marketplace_manager/index.js";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import dotenv from 'dotenv';
import { PaymentFeePayer } from "../sdk/marketplace_manager/utils/types/PaymentFeePayer.js";
dotenv.config();

async function initMarketplace() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const programId = new PublicKey("7KES27SK4AdZCCVj7nWgf5rUBFgyDMNSHEwgu7tvbnZW");
    const [marketplacePubkey] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("marketplace", "utf-8"),
            signer.publicKey.toBuffer()
        ],
        programId
    );
    const [accessMint, accessMintBump] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("access_mint", "utf-8"),
            marketplacePubkey.toBuffer(),
        ],
        programId
    );
    const accounts = {
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        accessMint,
    };
    const args = {
        accessMintBump,
        feesConfig: {
            fee: 0,
            feePayer: PaymentFeePayer.Seller,
            discountMint: null,
            feeReduction: null,
        },
        rewardsConfig: null
    };
    const marketplace = new MarketplaceManager();
    const txn = await marketplace.transacionBuilder.InitMarketplace(connection, accounts, args);
    txn.sign([signer]);
    
    await connection.sendRawTransaction(txn.serialize());
}
  
initMarketplace();