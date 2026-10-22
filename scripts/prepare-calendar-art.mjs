import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source=path.join(root,'assets/calendar/originals'), output=path.join(root,'public/images/calendar');
await fs.mkdir(output,{recursive:true});
let created=0;
for(const name of await fs.readdir(source)){
  if(!name.endsWith('.png'))continue;
  const dest=path.join(output,name.replace(/\.png$/,'.webp'));
  try{await fs.access(dest);continue;}catch{}
  const image=sharp(path.join(source,name)),metadata=await image.metadata();
  if(!metadata.hasAlpha)throw Error(`Transparency missing: ${name}`);
  await image.resize(360,360,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).webp({quality:88,alphaQuality:100}).toFile(dest);
  created++;
}
console.log(`Prepared ${created} new web illustrations; existing files preserved.`);
