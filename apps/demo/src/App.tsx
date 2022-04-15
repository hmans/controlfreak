import { Canvas, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Mesh } from "three"
import { controller } from "./controller"
import { DebugUI } from "./DebugUI"

const Thingy = ({ speed = 2 }) => {
  const ref = useRef<Mesh>(null!)

  useFrame((_, dt) => {
    controller.update()

    const move = controller.controls.move.value
    ref.current.position.x += move.x * dt * speed
    ref.current.position.y += move.y * dt * speed
  })

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

const Game = () => (
  <Canvas>
    <ambientLight />
    <directionalLight position={[10, 10, 10]} />

    <Thingy />
  </Canvas>
)

const App = () => {
  useEffect(() => {
    controller.start()
    return () => controller.stop()
  })

  return (
    <>
      <DebugUI />
      <Game />
    </>
  )
}

export default App
