import { IdlInstruction, Idl, IdlInstructionArg, IdlTypeDefined, IdlType } from "@metaplex-foundation/solita";
import { writeFiles } from "./writeFiles.js";

export function renderTransactionBuilder(idl: Idl, folder: string): [string, string][] {
    const files = idl.instructions.map(instruction => renderInstruction(instruction));
    files.push(renderIndex(idl.name, idl.instructions));

    writeFiles(folder, files);

    return files;
}

function renderIndex(name: string, instructions: IdlInstruction[]): [string, string] {
    const nameParts = name.split("_");
    const naMe = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
    const NaMe = naMe.charAt(0).toUpperCase() + naMe.slice(1);
    const content = `${instructions
        .map(instruction => `import { create${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}Transaction } from './${instruction.name}'`)
        .join('\n')}    
import { InstructionType } from "../layout/instructions";

export const ${NaMe}TransactionBuilder = {
    ${instructions.map(instruction => `[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}]: create${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}Transaction`)}
}`;

    return ['index.ts', content];
}

function renderInstruction(instruction: IdlInstruction): [string, string] {
    const instructionName = instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1);
    const instructionArgs = instruction.args.map(arg => {
        const argType = mapType(arg.type);
        return `${arg.name}: ${argType}`;
    }).join(', ');

    const importedArgs = instruction.args
        .filter(arg => isIdlTypeDefined(arg.type))
        .map((arg) => (arg.type as IdlTypeDefined).defined);

    const isImported = importedArgs[0] === instructionArgs.split(': ')[1]
    const args = instruction.args.length > 0 ? `, ${isImported ? `args` : `{${instructionArgs.split(':')[0]}}`}` : '';

    const content = `import { Connection, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
    import { ${instructionName}InstructionAccounts, create${instructionName}Instruction } from "../utils/instructions/${instruction.name}";
    ${instruction.args.length > 0 ? isImported ? `import {
        ${importedArgs}
    } from '../utils/types';` : '' : ''}
    ${containsBN(instruction)}

    export async function create${instructionName}Transaction(
        connection: Connection, 
        accounts: ${instructionName}InstructionAccounts,
        ${instructionArgs}
    ): Promise<VersionedTransaction> {
        ${instruction.args.length > 0 ? isImported ? 'const args = { params }' : '' : ''}
        const ix = create${instructionName}Instruction(accounts${args});
        let blockhash = (await connection.getLatestBlockhash('finalized')).blockhash;
        const messageV0 = new TransactionMessage({
            payerKey: accounts.signer,
            recentBlockhash: blockhash,
            instructions: [ix],
        }).compileToV0Message();
    
        return new VersionedTransaction(messageV0);
    }`;

    return [`${instruction.name}.ts`, content];
}


function isIdlTypeDefined(obj: any): obj is IdlTypeDefined {
    return typeof obj === 'object' && 'defined' in obj && typeof obj.defined === 'string';
}

function mapType(idlType: IdlType) {
    if (isIdlTypeDefined(idlType)) {
        return idlType.defined
    }
    
    switch (idlType) {
        case 'u8':
            return 'number';
        case 'u32':
            return 'number';
        case 'u64':
            return 'BN';
        case 'i8':
            return 'number';
        case 'i32':
            return 'number';
        case 'i64':
            return 'BN';
        case 'bool':
            return 'boolean';
        case 'string':
            return 'string';
        default:
            return 'any';
    }
}

function containsBN(instruction: IdlInstruction): string {
    const intTypes = ["i64", "u64", "i128", "u128"];
    let response = '';
    instruction.args.map((arg) => {
      if (intTypes.includes(arg.type.toString())) {
        response = `import BN from 'bn.js'`;
      }
    });
    return response;
}