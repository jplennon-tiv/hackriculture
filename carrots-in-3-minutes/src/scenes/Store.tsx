import React from 'react';
import {Scene, SceneInfo} from '../Scene';
export const Store:React.FC<{info:SceneInfo}>=({info})=><Scene info={info}/>;
