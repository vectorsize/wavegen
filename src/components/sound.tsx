import React, { useEffect } from 'react'

import { numHarmonics } from './constants'

type SoundProps = {
  amplitudes: number[]
  frequencies: number[]
  sampleRate: number
}

// Singletons
// --
const audioCtx = new AudioContext()
const masterGain = audioCtx.createGain()
const oscillators: OscillatorNode[] = []
const gains: GainNode[] = []

masterGain.connect(audioCtx.destination)
audioCtx.suspend()

// popullate graph
for (let i = 0; i < numHarmonics; i++) {
  const g = audioCtx.createGain()
  const osc = audioCtx.createOscillator()

  g.gain.setValueAtTime(0, audioCtx.currentTime)
  g.connect(masterGain)
  osc.connect(g)
  osc.start()

  gains.push(g)
  oscillators.push(osc)
}

const Sound = ({ amplitudes, frequencies }: SoundProps) => {
  useEffect(() => {
    amplitudes.map((a, i): void => {
      const g = gains[i]
      const osc = oscillators[i]
      g.gain.setValueAtTime(a * 0.9, audioCtx.currentTime)
      osc.frequency.value = frequencies[i]
    })
  }, [amplitudes, frequencies])

  return (
    <div>
      <button onClick={() => audioCtx.resume()}>Start Sound</button>
      <button onClick={() => audioCtx.suspend()}>Stop Sound</button>
    </div>
  )
}

export default Sound
