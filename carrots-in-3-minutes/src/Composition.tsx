import React from 'react';
import {AbsoluteFill,Sequence,staticFile,CanvasImage,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {TransitionSeries} from '@remotion/transitions';
import timeline from './timeline.json';
import {Captions} from './Captions';
import {Intro} from './scenes/Intro';
import {Soil} from './scenes/Soil';
import {Calendar} from './scenes/Calendar';
import {Sow} from './scenes/Sow';
import {Germinate} from './scenes/Germinate';
import {Thin} from './scenes/Thin';
import {Water} from './scenes/Water';
import {Mesh} from './scenes/Mesh';
import {Harvest} from './scenes/Harvest';
import {Store} from './scenes/Store';
import {Outro} from './scenes/Outro';
const components=[Intro,Soil,Calendar,Sow,Germinate,Thin,Water,Mesh,Harvest,Store,Outro];
export const MyComposition:React.FC=()=>{const frame=useCurrentFrame();const {durationInFrames}=useVideoConfig();const current=timeline.find(s=>frame>=s.startFrame&&frame<s.startFrame+s.durationInFrames);return <AbsoluteFill style={{fontFamily:'Arial, Helvetica, sans-serif',background:'#193d2f'}}>
 <TransitionSeries>{timeline.map((s,i)=>{const Component=components[i];return <TransitionSeries.Sequence key={s.id} durationInFrames={s.durationInFrames} name={s.section}><Component info={s}/><Sequence from={4}><Audio src={staticFile(`audio/${s.id}.wav`)}/></Sequence></TransitionSeries.Sequence>})}</TransitionSeries>
 <div style={{position:'absolute',left:82,top:102,display:'flex',alignItems:'center',gap:19,color:'#faf5e7'}}><CanvasImage src={staticFile('logo.jpg')} style={{width:70,height:70,borderRadius:35}}/><span style={{fontSize:33,fontWeight:800,letterSpacing:-1}}>HACKRICULTURE</span></div>
 <div style={{position:'absolute',left:84,top:190,height:2,width:838,background:'#54725a'}}/>
 <Captions/>
 <div style={{position:'absolute',left:84,top:1740,width:838,display:'flex',justifyContent:'space-between',color:'#b7c6ac',fontSize:25,letterSpacing:2}}><span>GROW YOUR OWN / 001</span><span>{current?.id==='intro'?'SEED → HARVEST':`${String(timeline.findIndex(s=>s.id===current?.id)+1).padStart(2,'0')} / 11`}</span></div>
 <div style={{position:'absolute',left:84,top:1796,width:838,height:5,background:'#43624d'}}><div style={{width:`${100*frame/(durationInFrames-1)}%`,height:'100%',background:'#ddea87'}}/></div>
 </AbsoluteFill>};
