import React from 'react';
import {Composition} from 'remotion';
import {MyComposition} from './Composition';
export const RemotionRoot:React.FC=()=> <Composition id='CarrotsIn3Minutes' component={MyComposition} durationInFrames={4377} fps={30} width={1080} height={1920}/>;
