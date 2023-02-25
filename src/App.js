import { useRef } from "react";

import "./App.css";
// import THREE from 'three/src/Three';
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// const Geometry = new THREE.Geometry()
extend({ OrbitControls });

function Orit() {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
}

function Box(props) {
  const ref = useRef();
  useFrame((state) => {
    // ref.current.rotation.x += 0.01;
    ref.current.rotation.y -= 0.01;
  });
  return (
    <mesh ref={ref} {...props} castShadow receiveShadow>
      <boxGeometry />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  );
}

function Floor(props) {
  return (
    <mesh {...props} castShadow receiveShadow>
      <boxGeometry args={[20, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
}

function Bulb(props) {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
}

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas
        shadows={{ type: "BasicShadowMap" }}
        style={{ background: "black" }}
        camera={{ position: [1, 5, 1] }}
      >
        <fog attach="fog" args={["white", 1, 10]}/>
        <ambientLight intensity={0.2} />
        <Bulb position={[0, 3, 0]} />
        <pointLight />
        <Box position={[0, 1, 0]} />
        <Orit />
        <axesHelper args={[5]} />
        <Floor position={[0, -0.5, 0]} />
      </Canvas>
    </div>
  );
}

export default App;
