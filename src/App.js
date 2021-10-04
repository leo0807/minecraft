import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Physics } from 'use-cannon';
import Ground from './components/Ground';
import Player from './components/Player';
import Cube from './components/Cube';
import { useStore } from './hooks/useStore';
import { useInterval } from './hooks/useInterval';
import { nanoid } from 'nanoid';
import BGM from './components/BGM';
import calm1 from './music/bgm/calm1.mp3';


function App() {
  // const playList = [calm1, calm2];
  const [cubes, saveWorld, clearCubes] = useStore(state => [
    state.cubes,
    state.saveWorld,
    state.clearCubes
  ]);
  useInterval(() => {
    saveWorld(cubes);
    console.log('Saved');
  }, 10 * 1000);
  return (
    <>
      <button
        onClick={e => clearCubes(cubes)}
      >Clear Cubes</button>
      <BGM src={calm1} controls={false} loop={true} preload='auto' autoplay={false} />
      <Canvas shadowMap sRGB>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight position={[100, 100, 100]} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
          {
            cubes.map(cube => (
              <Cube key={nanoid()} position={cube.pos} texture={cube.texture || 'dirt'} />
            ))
          }
        </Physics>
      </Canvas>
    </>);
}

export default App;
