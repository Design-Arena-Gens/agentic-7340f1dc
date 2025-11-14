'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import Battery from './Battery'

interface BatterySceneProps {
  charge: number
}

export default function BatteryScene({ charge }: BatterySceneProps) {
  return (
    <Canvas
      camera={{ position: [5, 3, 5], fov: 50 }}
      shadows
    >
      <color attach="background" args={['#0f0f23']} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      <Battery charge={charge} />

      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={4}
      />

      <Environment preset="city" />

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
