import { useRef } from "react";

import "./App.css";
import * as THREE from "three";
import {
  Canvas,
  useFrame,
  useThree,
  extend,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

function Orit() {
  const { camera, gl } = useThree();
  return <orbitControls args={[camera, gl.domElement]} />;
}

function Box(props) {
  const ref = useRef();
  const texture = useLoader(THREE.TextureLoader, "/wood.jpg")
  useFrame((state) => {
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y -= 0.01;
  });
  return (
    <mesh ref={ref} {...props} castShadow>
      <boxGeometry />
      <meshPhysicalMaterial
        // color="white"
        //
        // metalness={1}
        map={texture}
        // transparent
        // roughness={0}
        // clearcoat={1}
        // transmission={0.5}
        // reflectivity={1}
        // side={THREE.DoubleSide}
      />
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
        camera={{ position: [3, 3, 3] }}
      >
        <fog attach="fog" args={["white", 1, 10]} />
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
