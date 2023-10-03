import { ComputeBudgetProgram, Connection, Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction } from "@solana/web3.js";
import dotenv from 'dotenv';
import { createInitNetworkInstruction } from "./utils/solita/tender/instructions/initNetwork.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync } from "@solana/spl-token";
import { METADATA_PROGRAM_ID_PK, TENDER_PROGRAM_ID_PK } from "./constants.js";
import { createInitRolesInstruction } from "./utils/solita/tender/instructions/initRoles.js";

dotenv.config();

async function requestAccess() {
    const rpc = process.env.rpc || '';
    if (rpc === '') throw new Error("RPC not found in environment variables.");

    const secret = JSON.parse(process.env.secondSecret || '');
    if (secret === '') throw new Error("Secret not found in environment variables.");

    const secretUint8Array = new Uint8Array(secret);
    const signer = Keypair.fromSecretKey(secretUint8Array);
    const connection: Connection = new Connection(rpc);

    const [network] = PublicKey.findProgramAddressSync(
        [Buffer.from("network", "utf-8")],
        TENDER_PROGRAM_ID_PK
    );
    const [networkMint] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("network_mint", "utf-8"),
            network.toBuffer(),
        ],
        TENDER_PROGRAM_ID_PK
    );
    const [councilCollection] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("council", "utf-8"),
            network.toBuffer(),
        ],
        TENDER_PROGRAM_ID_PK
    );
    const councilCollectionVault = getAssociatedTokenAddressSync(
        councilCollection,
        network,
        true,
    );
    const [councilCollectionMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          councilCollection.toBuffer()
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [councilCollectionMasterEdition] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          councilCollection.toBuffer(),
          Buffer.from("edition", "utf-8"), 
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [serviceCollection] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("service", "utf-8"),
            network.toBuffer(),
        ],
        TENDER_PROGRAM_ID_PK
    );
    const serviceCollectionVault = getAssociatedTokenAddressSync(
        serviceCollection,
        network,
        true,
    );
    const [serviceCollectionMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          serviceCollection.toBuffer()
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [serviceCollectionMasterEdition] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          serviceCollection.toBuffer(),
          Buffer.from("edition", "utf-8"), 
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [proposalCollection] = PublicKey.findProgramAddressSync(
        [
            Buffer.from("proposal", "utf-8"),
            network.toBuffer(),
        ],
        TENDER_PROGRAM_ID_PK
    );
    const proposalCollectionVault = getAssociatedTokenAddressSync(
        proposalCollection,
        network,
        true,
    );
    const [proposalCollectionMetadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          proposalCollection.toBuffer()
        ],
        METADATA_PROGRAM_ID_PK
    );
    const [proposalCollectionMasterEdition] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata", "utf-8"), 
          METADATA_PROGRAM_ID_PK.toBuffer(),
          proposalCollection.toBuffer(),
          Buffer.from("edition", "utf-8"), 
        ],
        METADATA_PROGRAM_ID_PK
    );
    const networkAccounts = {
        signer: signer.publicKey,
        network,
        networkMint,
        councilCollection,
        serviceCollection,
        proposalCollection,
        proposalCollectionVault,
        proposalMetadata: proposalCollectionMetadata,
        proposalCollectionMasterEdition,        
        rent: SYSVAR_RENT_PUBKEY,
        SystemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram:ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METADATA_PROGRAM_ID_PK,
    }
    console.log(networkAccounts)

    const proposalCollectionUri: string = 'https://shdw-drive.genesysgo.net/E8yeCMMgZCimwwh16LFMbWF4VDfQSzGWLcbXqFnrXMT6/DNzw56KHzDVqmfeKGSG8xut9JDTAUBZD64idjo2G9oJf.json?ts=1689256340';
    const networkIx = createInitNetworkInstruction(networkAccounts, { proposalCollectionUri });
    const networkTx = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: 250000 })).add(networkIx);
    let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    networkTx.recentBlockhash = blockhash;
    networkTx.feePayer = signer.publicKey;
    networkTx.partialSign(signer);

    await connection.sendRawTransaction(networkTx.serialize());

    const rolesAccounts = {
        signer: signer.publicKey,
        network,
        networkMint,
        councilCollection,
        councilCollectionVault,
        councilCollectionMetadata,
        councilCollectionMasterEdition,
        serviceCollection,
        serviceCollectionVault,
        serviceCollectionMetadata,
        serviceCollectionMasterEdition,
        rent: SYSVAR_RENT_PUBKEY,
        SystemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram:ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METADATA_PROGRAM_ID_PK,
    }
    console.log(rolesAccounts)
    const serviceCollectionUri: string = 'https://shdw-drive.genesysgo.net/E8yeCMMgZCimwwh16LFMbWF4VDfQSzGWLcbXqFnrXMT6/DNzw56KHzDVqmfeKGSG8xut9JDTAUBZD64idjo2G9oJf.json?ts=1689256340';
    const councilCollectionUri: string = 'https://shdw-drive.genesysgo.net/E8yeCMMgZCimwwh16LFMbWF4VDfQSzGWLcbXqFnrXMT6/7QFMZM7hwxgQTAkfpbKyMxZ57ZRBpNpfPddbEdzoYxzx.json?ts=1689254939';
    const rolesParams = {
        params: {
            serviceCollectionUri,
            councilCollectionUri,
        }
    };

    const rolesIx = createInitRolesInstruction(rolesAccounts, rolesParams);
    const rolesTx = new Transaction().add(ComputeBudgetProgram.setComputeUnitLimit({ units: 350000 })).add(rolesIx);
    blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
    rolesTx.recentBlockhash = blockhash;
    rolesTx.feePayer = signer.publicKey;
    rolesTx.partialSign(signer);

    await connection.sendRawTransaction(rolesTx.serialize());
}

requestAccess();