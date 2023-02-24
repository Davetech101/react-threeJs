import "./App.css";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas style={{background: "black"}}>
        <mesh>
          <boxBufferGeometry />
          <meshBasicMaterial color="blue"/>
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
