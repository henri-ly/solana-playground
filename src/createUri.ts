import { MetaplexFile } from "@metaplex-foundation/js";
import { bundlr } from "./bundlr";
import { readFile } from 'fs'

async function createUri(name: string) {
    readFile(`../${name}`, async (err, data) => {
        if (err) {
          console.error('Error reading the image:', err);
          return;
        }
      
        const buffer = Buffer.from(data);
        const fileName = `${name}.png`;
        const proposalCollectionMetadataObject: MetaplexFile = {
            buffer,
            fileName,
            displayName: name,
            uniqueName: name,
            contentType: "image/png",
            extension: "png",
            tags: [],
        };
        let uri = await bundlr.upload(proposalCollectionMetadataObject);
        console.log(uri)
    });
}

createUri('proposalCollection');