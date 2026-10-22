import React from 'react';
import {AbsoluteFill, Interactive, interpolate, useCurrentFrame, Easing} from 'remotion';
import {Diagram,P} from './Artwork';
export type SceneInfo={id:string;section:string;title:string;accent:string;text:string;note:string;durationInFrames:number;audioDuration:number;};
export const Scene:React.FC<{info:SceneInfo}>=({info})=>{const frame=useCurrentFrame();return <AbsoluteFill style={{backgroundColor:P.green,color:P.cream,fontFamily:'Arial, Helvetica, sans-serif'}}>
 <div style={{position:'absolute',left:82,top:242,fontSize:30,letterSpacing:4,fontWeight:700,color:P.lime}}>{info.section}</div>
 <Interactive.Div name='Scene heading' style={{position:'absolute',left:80,top:310,width:840,fontSize:info.id==='outro'?87:112,lineHeight:1.02,fontWeight:800,letterSpacing:-5,whiteSpace:'pre-line',opacity:interpolate(frame,[0,15],[0,1],{extrapolateRight:'clamp'}),translate:interpolate(frame,[0,20],['0px 25px','0px 0px'],{extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)})}}>{info.title}</Interactive.Div>
 <Interactive.Div name='Key takeaway' style={{position:'absolute',left:84,top:info.id==='intro'?450:info.id==='outro'?620:566,width:840,fontSize:info.id==='intro'?77:46,fontWeight:700,color:P.orange,letterSpacing:-1}}>{info.accent}</Interactive.Div>
 <div style={{position:'absolute',left:70,top:info.id==='intro'?605:700,width:860,height:650,opacity:interpolate(frame,[8,28],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}><Diagram kind={info.id}/></div>
 <div style={{position:'absolute',left:84,top:1390,width:820,color:P.lime,fontSize:33,lineHeight:1.3}}>{info.note}</div>
 </AbsoluteFill>};
