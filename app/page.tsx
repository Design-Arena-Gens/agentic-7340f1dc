'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const BatteryScene = dynamic(() => import('../components/BatteryScene'), {
  ssr: false,
})

export default function Home() {
  const [charge, setCharge] = useState(75)

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute top-0 left-0 right-0 z-10 p-8">
        <h1 className="text-4xl font-bold text-white mb-6">3D Battery Component</h1>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 max-w-md">
          <label className="block text-white mb-2 font-medium">
            Battery Charge: {charge}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={charge}
            onChange={(e) => setCharge(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          <div className="mt-4 grid grid-cols-4 gap-2">
            {[0, 25, 50, 75, 100].map((level) => (
              <button
                key={level}
                onClick={() => setCharge(level)}
                className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                {level}%
              </button>
            ))}
          </div>
        </div>
      </div>
      <BatteryScene charge={charge} />
    </main>
  )
}
