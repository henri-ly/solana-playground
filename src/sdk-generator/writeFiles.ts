import { writeFileSync, existsSync, mkdirSync } from "fs";
import { Options, format } from "prettier"

export async function writeFiles(dir: string, files: [string, string][]) {
  if(!existsSync(dir)) mkdirSync(dir);
  
  for (const [filename, content] of files) {
    try {
      writeFileSync(`${dir}/${filename}`, await format(content, DEFAULT_FORMAT_OPTS));
    } catch (err) {
      console.log(err)
      console.log(`Failed to format ${dir}/${filename}`);
    }
  }
}

const DEFAULT_FORMAT_OPTS: Options = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  useTabs: false,
  tabWidth: 2,
  arrowParens: 'always',
  printWidth: 80,
  parser: 'typescript',
};
  