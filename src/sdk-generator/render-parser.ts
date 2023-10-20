import { IdlInstruction, IdlAccount, Idl, IdlInstructionArg, IdlTypeDefined, IdlField } from "@metaplex-foundation/solita";
import { writeFiles } from "./writeFiles.js";

export function renderParser(idl: Idl, folder: string): [string, string][] {
    let files: [string, string][] = [];

    files.push(renderIndex(idl.name));
    files.push(renderAccounts(idl.accounts));
    files.push(renderInstructions(idl.instructions));

    writeFiles(folder, files);

    return files;
}

function renderIndex(name: string): [string, string] {
    const nameParts = name.split("_");
    const naMe = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
    const NaMe = naMe.charAt(0).toUpperCase() + naMe.slice(1);
    const content = `import { instructionParsers } from './instructions'
import { getInstructionType } from '../layout/instructions'
import { accountParsers } from './accounts'
import { getAccountType } from '../layout/accounts'
    
export const ${NaMe}Parser = {
    instructionParsers,
    getInstructionType,
    accountParsers,
    getAccountType
}`;

    return ['index.ts', content];
}

function renderAccounts(accounts: IdlAccount[] | undefined): [string, string] {
    const accountInfo = accounts
        ?.map(account => generateAccountInfo(account))
        .join('\n');

    const importedTypes = accounts
        ?.flatMap(account => 
            account.type.fields
                .filter(field => isIdlTypeDefined(field.type))
                .map((field) => (field.type as IdlTypeDefined).defined)
        );
    
    const imports = importedTypes && importedTypes.length > 0
        ? `
            import {
                ${importedTypes.join(', ')}
            } from '../utils/types';`
        : '';
      

    const content = `import { ACCOUNTS_DATA_LAYOUT, AccountType } from '../layout/accounts.js'

${imports}

export const accountParsers = {
    ${accounts?.map(account => {
        return `[AccountType.${account.name}]: parse${account.name}`
    }).join(',')}
};

${accounts?.map(account => {
        const functionName = `parse${account.name}`;
        const accountType = `AccountType.${account.name}`;
        return `
function ${functionName}(accountData: Buffer): ${account.name}Info {
    return ACCOUNTS_DATA_LAYOUT[${accountType}].deserialize(accountData)[0];
}
`
    }).join('\n')}

${accountInfo}
`;

    return ['accounts.ts', content];
}

function generateAccountInfo(account: IdlAccount): string {
    const filteredFields = account.type.fields.filter(field => !isFieldEmpty(field));
    if (filteredFields.length === 0) {
        return '';
    }

    const fields = filteredFields.map(processAccountField).join('\n');

    return `
export type ${account.name}Info = {
    ${fields}
};
`;
}

function isFieldEmpty(field: IdlField): boolean {
    return !field.name || !field.type || field.name === 'type';
}

function processAccountField(field: IdlField) {
    const typeMappings: Record<string, string> = {
        ['publicKey']: 'string',
        ['i64']: 'BN',
        ['u32']: 'number',
        ['string']: 'string',
        ['u8']: 'number',
    };
    if (isIdlTypeDefined(field.type)) {
        return `${field.name}: ${field.type.defined}`;
    } else {
        const tsType = typeMappings[field.type.toString()] || 'any';
        return `${field.name}: ${tsType}`;
    }
}

function renderInstructions(instructions: IdlInstruction[]): [string, string] {
    const importedArgs = instructions
        .map(instruction => 
            instruction.args
                .filter(arg => isIdlTypeDefined(arg.type))
                .map((arg) => (arg.type as IdlTypeDefined).defined)
        )
        .flat();
    const content = `
import { IX_ACCOUNTS_LAYOUT, IX_DATA_LAYOUT, InstructionType } from '../layout/instructions.js'
${importedArgs.length > 0 ? 
`import {
    ${importedArgs}
} from '../utils/types'` : ''};

${containsBN(instructions)}

export const instructionParsers = {
    ${instructions.map(instruction => {
        return `[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}]: parse${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}`
    }).join(',\n')}
};

${instructions.map(instruction => generateParseFuntion(instruction)).join('\n')}

${instructions.map(instruction => generateInstructionInfo(instruction)).join('\n')}`;

    return ['instructions.ts', content];
}

function generateParseFuntion(instruction: IdlInstruction) {
    const functionName = `parse${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}`;
    const accountsKeys = 'accountsKeys: string[]';
    const resultType = `${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}Info`;
    const accounts = `IX_ACCOUNTS_LAYOUT[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}]`;
    const context = `IX_DATA_LAYOUT[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}].deserialize(instructionData)`;

    return `function ${functionName}(instructionData: Buffer, ${accountsKeys}): ${resultType} {
    const accounts = ${accounts};
    const [context] = ${context};
    const { ...result } = context;

    return {
        ${generateAccountMapping(instruction)},
        ...result,
    };
}`;
}

function generateAccountMapping(instruction: IdlInstruction) {
    const accountMappings = instruction.accounts
        .filter(account => !account.name.includes("Program"))
        .map(account => {
            return `${account.name}: accountsKeys[accounts.indexOf('${account.name}')]`;
        });

    return accountMappings.join(',\n        ');
}

function generateInstructionInfo(instruction: IdlInstruction) {
    const filteredAccounts = instruction.accounts.filter(account => !account.name.includes('Program'));
    const argLines = instruction.args.map(arg => processInstructionArgument(arg));
    return `export type ${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}Info = {
        ${filteredAccounts.map(account => `${account.name}: string`)}
        ${argLines.map(argLine => argLine)}
    }`;
}

function processInstructionArgument(arg: IdlInstructionArg) {
    const typeMappings: Record<string, string> = {
        ['u64']: 'BN',
        ['i64']: 'BN',
        ['u32']: 'number',
        ['string']: 'string',
    };
    if (isIdlTypeDefined(arg.type)) {
        return `${arg.name}: ${arg.type.defined}`
    } else {
        console.log(arg)
        const tsType = `${arg.name}: ${typeMappings[arg.type.toString()] || 'any'}`;
        return tsType;
    }
}

function isIdlTypeDefined(obj: any): obj is IdlTypeDefined {
    return typeof obj === 'object' && 'defined' in obj && typeof obj.defined === 'string';
}

function containsBN(instructions: IdlInstruction[]): string {
    const intTypes = ["i64", "u64", "i128", "u128"];
    let response = '';
    instructions.map((instruction) => instruction.args.map((arg) => {
      if (intTypes.includes(arg.type.toString())) {
        response = `import BN from 'bn.js'`;
      }
    }));
    return response;
}