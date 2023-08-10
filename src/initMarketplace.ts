import { InitMarketplaceInstructionAccounts, InitMarketplaceInstructionArgs, PaymentFeePayer, createInitMarketplaceInstruction } from "./utils/solita/brick/index.js";
import { Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { BRICK_PROGRAM_ID_PK, FNET_MINT } from "./constants.js";
import dotenv from 'dotenv';
dotenv.config();

async function initMarketplace() {
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
    const [bountyVault] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("bounty_vault", "utf-8"),
          marketplacePubkey.toBuffer(),
          FNET_MINT.toBuffer()
        ],
        BRICK_PROGRAM_ID_PK
    );
    const [accessMint, accessMintBump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("access_mint", "utf-8"),
          marketplacePubkey.toBuffer(),
        ],
        BRICK_PROGRAM_ID_PK
    );

    const accounts: InitMarketplaceInstructionAccounts = {
        systemProgram: SystemProgram.programId,
        tokenProgram2022: TOKEN_2022_PROGRAM_ID,
        tokenProgramV0: TOKEN_PROGRAM_ID,
        rent: SYSVAR_RENT_PUBKEY,
        signer: signer.publicKey,
        marketplace: marketplacePubkey,
        accessMint: accessMint,
        rewardMint: FNET_MINT,
        discountMint: FNET_MINT,
        bountyVault: bountyVault,
    };
    const args: InitMarketplaceInstructionArgs = {
        params: {
            fee: 100,
            feeReduction: 20,
            sellerReward: 10,
            buyerReward: 10,
            useCnfts: true,
            deliverToken: false,
            transferable: false,
            chainCounter: false,
            permissionless: false,
            rewardsEnabled: false,
            accessMintBump: accessMintBump,
            feePayer: PaymentFeePayer.Buyer,
        }
    };
    const ix = createInitMarketplaceInstruction(accounts, args);
    let transaction = new Transaction().add(ix);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signer.publicKey;
    transaction.partialSign(signer);

    await connection.sendRawTransaction(transaction.serialize())
}

initMarketplace();