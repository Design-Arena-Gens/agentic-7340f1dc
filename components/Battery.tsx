'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Color } from 'three'
import { Text } from '@react-three/drei'

interface BatteryProps {
  charge: number
}

export default function Battery({ charge }: BatteryProps) {
  const batteryRef = useRef<Mesh>(null)
  const chargeRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (batteryRef.current) {
      batteryRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const chargeColor = useMemo(() => {
    if (charge > 60) return new Color('#10b981') // green
    if (charge > 30) return new Color('#f59e0b') // orange
    return new Color('#ef4444') // red
  }, [charge])

  const chargeHeight = (charge / 100) * 2.5

  return (
    <group position={[0, 0, 0]}>
      {/* Battery body */}
      <mesh ref={batteryRef} castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 3, 1]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Battery outline/frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.55, 3.05, 1.05]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.9}
          roughness={0.1}
          wireframe
        />
      </mesh>

      {/* Charge indicator (liquid inside) */}
      <mesh
        ref={chargeRef}
        position={[0, -1.25 + chargeHeight / 2, 0]}
        castShadow
      >
        <boxGeometry args={[1.3, chargeHeight, 0.8]} />
        <meshStandardMaterial
          color={chargeColor}
          emissive={chargeColor}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Battery terminal (positive) */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Plus sign on terminal */}
      <Text
        position={[0, 1.9, 0.16]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        +
      </Text>

      {/* Charge percentage text */}
      <Text
        position={[0, 0, 0.55]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {charge}%
      </Text>

      {/* Battery capacity lines */}
      {[0.75, 0.25, -0.25, -0.75].map((y, i) => (
        <mesh key={i} position={[-0.76, y, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.85]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}
