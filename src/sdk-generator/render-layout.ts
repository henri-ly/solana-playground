import { IdlInstruction, IdlAccount, Idl } from "@metaplex-foundation/solita";
import { writeFiles } from "./writeFiles.js";

export function renderLayout(idl: Idl, folder: string): [string, string][] {
    let files: [string, string][] = [];

    files.push(renderAccountLayouts(idl.accounts));
    files.push(renderIxLayouts(idl.instructions));

    writeFiles(folder, files);

    return files;
}

function renderAccountLayouts(accounts: IdlAccount[] | undefined): [string, string] {
  let accountLayouts = '';

  if (accounts && accounts.length > 0) {
    accountLayouts = `import {
${accounts.map(account => `  ${account.name.charAt(0).toLowerCase().concat(account.name.slice(1))}Discriminator,
  ${account.name.charAt(0).toLowerCase().concat(account.name.slice(1))}Beet,`).join('\n')}
} from '../utils/accounts/index.js'

export enum AccountType {
${accounts.map(account => `   ${account.name} = '${account.name}',`).join('\n')}
}

export function getAccountType(data: Buffer): AccountType | undefined {
  const discriminator: string = Buffer.from(data.buffer, data.byteOffset, 8).toString('ascii');
  return ACCOUNT_DISCRIMINATOR[discriminator];
}

export const ACCOUNT_DISCRIMINATOR: Record<string, AccountType> = {
${accounts
  .map(
    (account) =>
      `[Buffer.from(${account.name.charAt(0).toLowerCase() + account.name.slice(1)}Discriminator).toString('ascii')]: AccountType.${account.name},`
  )
  .join('\n')}
}

export const ACCOUNTS_DATA_LAYOUT: Record<
    AccountType,
    any
> = {
${accounts.map(account => `   [AccountType.${account.name}]: ${account.name.charAt(0).toLowerCase().concat(account.name.slice(1))}Beet,`).join('\n')}
}`;
  }

  return ['accounts.ts', accountLayouts];
}


function renderIxLayouts(instructions: IdlInstruction[]): [string, string] {
  let ixLayouts = `import { 
${instructions
  .map(instruction => `${instruction.name}InstructionDiscriminator, ${instruction.name}Struct`)
  .join(',\n  ')}
} from '../utils/instructions/index.js'

export enum InstructionType {
  ${instructions
    .map(instruction => `${instruction.name.charAt(0).toUpperCase()}${instruction.name.slice(1)} = '${instruction.name.charAt(0).toUpperCase()}${instruction.name.slice(1)}'`)
    .join(',\n  ')}
}

export function getInstructionType(data: Buffer): InstructionType | undefined {
  const discriminator = Buffer.from(data.buffer, data.byteOffset, 8);
  return IX_DISCRIMINATORS[discriminator.toString('ascii')];
}

${instructions
  .map(instruction => `export const ${instruction.name}Accounts = [
    ${instruction.accounts.map(account => `'${account.name}'`)}
  ]`)
  .join(',\n')}

const IX_DISCRIMINATORS = {
  ${instructions
    .map(instruction => `[Buffer.from(${instruction.name}InstructionDiscriminator).toString('ascii')]: InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}`)
    .join(',\n  ')}
};

export const IX_DATA_LAYOUT: Partial<Record<InstructionType, any>> = {
  ${instructions
    .map(
      instruction => `[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}]: ${instruction.name.charAt(0).toLowerCase() + instruction.name.slice(1)}Struct,`
    )
    .join('\n')}
}
  
export const IX_ACCOUNTS_LAYOUT: Partial<Record<InstructionType, any>> = {
  ${instructions
    .map(instruction => `[InstructionType.${instruction.name.charAt(0).toUpperCase() + instruction.name.slice(1)}]: ${instruction.name}Accounts,`)
    .join('\n')}
}
`;

  return ['instructions.ts', ixLayouts];
}