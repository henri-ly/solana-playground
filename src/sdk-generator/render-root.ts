import { Idl } from "@metaplex-foundation/solita";
import { writeFiles } from "./writeFiles.js";

export function renderRoot(idl: Idl, folder: string){
    let files: [string, string][] = [];

    files.push(renderIndex(idl.name));

    writeFiles(folder, files);
}

function renderIndex(name: string): [string, string] {
    const nameParts = name.split("_");
    const naMe = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join("");
    const NaMe = naMe.charAt(0).toUpperCase() + naMe.slice(1);

    const content = `import { ${NaMe}Parser } from './parser/index.js'
import { ${NaMe}TransactionBuilder } from './transaction-builder/index.js'
export class ${NaMe} {
    public parser = ${NaMe}Parser;
    public transacionBuilder = ${NaMe}TransactionBuilder;
}`

    return ['index.ts', content];
}