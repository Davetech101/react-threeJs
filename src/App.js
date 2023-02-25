import { useRef } from "react";

import "./App.css";
// import THREE from 'three/src/Three';
import { Canvas, useFrame, useThree,  extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
// const Geometry = new THREE.Geometry()
extend({ OrbitControls })

function Orit() {
  const {camera, gl} = useThree()
  return(
    <orbitControls args={[camera, gl.domElement]}/>
  )
}

function Box(props) {
  const ref = useRef()
  useFrame(state => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  });
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
}

function Floor(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
}

function Bulb(props) {
  return (
    <mesh {...props}>
      <sphereBufferGeometry/>
      <meshPhongMaterial emissive="yellow"/>
    </mesh>
  );
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas style={{ background: "black" }} camera={{position: [3,3,3]}}>
        <ambientLight intensity={.2}/>
        <pointLight/> 
        <Bulb/>
        <Box position={[-1,1,2]}/>
        <Orit/>
        <axesHelper args={[5]}/> 
        <Floor position={[0, -0.5, 0]}/>
      </Canvas>
    </div>
  );
}

export default App;
