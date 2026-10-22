import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {Caption} from '@remotion/captions';
import data from './captions.json';
const pages:Caption[]=data;
export const Captions:React.FC=()=>{const t=useCurrentFrame()/30*1000;const p=pages.find(c=>c.startMs<=t&&c.endMs>t);return p?<div style={{position:'absolute',left:80,top:1510,width:840,minHeight:132,padding:'23px 28px',boxSizing:'border-box',background:'#102b22',borderRadius:12,color:'#faf5e7',fontSize:44,fontWeight:600,lineHeight:1.25,textAlign:'center'}}>{p.text}</div>:null;};
