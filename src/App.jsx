import { Canvas, useFrame, useLoader, useThree, extend } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, useAspect, useVideoTexture, useTexture, useGLTF, useAnimations, Billboard, Text, Html } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import flyThroughState from "./flyThruState.json"; // import this after creating the animation for production
import { editable as e } from "@theatre/r3f"; // remove this before deploying to production
import { React, useState, useRef, useEffect, Suspense } from 'react'; //used for markqer function
import * as THREE from 'three';
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { Model } from './Model';
import { Model_Girl } from './Model_Girl';
import './main.css';
import Portal from './Portal';
import { ReactDOM, createPortal } from 'react-dom';
import Modal from './ModalContent';
import useModal from './useModal';
//import { Modal, ReactModal } from 'react-modal';

export default function App() {
//  const sheet = getProject("Fly Through").sheet("Scene"); // used when creating keyframes/json file
  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene"); // used after creating json keyframe file - needs to match the import at top of file

  const {isShowing, toggle} = useModal(); // connects to modalcontent.jsx
  //const {width, height } = useThree(state => state.viewport) // for the static menu

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={6}>
        <SheetProvider sheet={sheet}>
          <Scene />
          <Model position={[-3.4, 0.21, -4]} onClick={toggle} />
          <Model_Girl position={[-3.63, 1.47, .15]} rotation={[ 0, .5, 0]} scale={.75} onClick={toggle} />
        </SheetProvider>
      </ScrollControls>
      <Html>
        <div className="App">
          <Modal isShowing={isShowing} hide={toggle} />
        </div>
      </Html>
    </Canvas>
  );
}

// 3D Background Scene with 3D Prompt Objects
function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const group = useRef();
  const group2 = useRef();
  const texture = useLoader(THREE.TextureLoader, '/assets/sharon-prompt1-response.png');
  const videoTexture = useVideoTexture('/assets/prompt3.mp4');
  const vTexture2 = useVideoTexture('/assets/yanina-dancing.mp4');
  const size = useAspect(16, 9);
  const box = useRef();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  // For 3D Rotating Cup - we use the useFrame hook here to rotate on the x-axis.
  useFrame(() => {
    // rotating the group instead of the mesh
    group.current.rotation.y += Math.PI / 200
    });

  const bgColor = "#84a4f4";
  const {isShowing, secondToggle} = useModal();

  return (
    <>
      /* 3D Global Scene Elements */
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-2} far={10} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      
      /* 3D Background River */
      <Gltf src="/assets/better-river.glb" castShadow receiveShadow />

      // 3D Prompts
      // Billboard Image - Right
      <e.mesh theatreKey="Prompt1" position={[-4.19, 1, 2.49]} rotation={[0, 1.09, 0]} onClick={secondToggle}>
      <boxGeometry args={[1, 2, .005]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </e.mesh>

      // River Video Sideways - Back
      <e.mesh theatreKey="Prompt2" position={[3.19, 1, 0.4]} rotation={[0,1.95,0]} onClick={objectClickHandler2} scale={size}>
        <boxGeometry />
        <meshBasicMaterial attach="material" map={videoTexture} toneMapped={false} />
      </e.mesh>

      // 3D Cube Image - Left
      <e.mesh ref={box} theatreKey="Prompt3" position={[3.63, 1, -.5]} rotation={[0,1.24,0]} onClick={objectClickHandler3}>
        <boxGeometry args={[1, 2, .5]} />
        <meshBasicMaterial attach="material" map={vTexture2} toneMapped={false} />
      </e.mesh>

      // 3D Spinning Object - Right
      <group ref={group} dispose={null} position={[3.2, 0.83, -8.5]} height={20}>
         <Gltf src="/assets/tea-cup.glb" castShadow receiveShadow onClick={objectClickHandler4} />
      </group>

      // 3D Tree with grass
      <group ref={group2} dispose={null} position={[4,0,-2]} animation={false} >
        <Gltf src="/assets/tree-with-grass.glb" castShadow receiveShadow />
      </group>

      // Second Modal test
      <Html>
        <div className="App">
          <Modal isShowing={isShowing} hide={secondToggle} />
        </div>
      </Html>

      // 3D camera
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}

// Default click handler for our three.js objects
function objectClickHandler() {
  window.open('prompt1.html', '_self');
}
function objectClickHandler2() {
  window.open('prompt1.html', '_self');
}
function objectClickHandler3() {
  window.open('prompt1.html', '_self');
}
function objectClickHandler4() {
  window.open('prompt1.html', '_self');
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

const modal = document.querySelector('.modal')

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    modal.style.display = 'none';
  }
})

/*window.onload = function() {
  App();
}*/