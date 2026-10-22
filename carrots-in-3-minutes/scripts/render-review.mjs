import {bundle} from '@remotion/bundler';
import {selectComposition,renderStill} from '@remotion/renderer';
import fs from 'node:fs';
const timeline=JSON.parse(fs.readFileSync('src/timeline.json','utf8'));
const serveUrl=await bundle({entryPoint:'src/index.ts'});
const composition=await selectComposition({serveUrl,id:'CarrotsIn3Minutes'});
for(const s of timeline){await renderStill({serveUrl,composition,output:`out/review-${s.id}.png`,frame:s.startFrame+Math.min(145,s.durationInFrames-1),scale:.35}); console.log(s.id);}
