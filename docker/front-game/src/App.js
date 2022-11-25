import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div id="canvas-container">
      <Canvas
        shadows
        orthographic
        camera={{ position: [10, 20, 20], zoom: 80 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
