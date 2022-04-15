import { Canvas } from "@react-three/fiber"

const Thingy = () => {
  return (
    <mesh>
      <dodecahedronGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function App() {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />

      <Thingy />
    </Canvas>
  )
}

export default App
