import React, { useState, useEffect } from 'react'

import Keyboard from './keyboard'
import { numHarmonics } from './constants'

type SoundProps = {
  amplitudes: number[]
  frequencies: number[]
  sampleRate: number
}

const attackTime = 0.2
const releaseTime = 0.2

// Singletons
// --
const audioCtx = new AudioContext()
const masterGain = audioCtx.createGain()
const oscillators: OscillatorNode[] = []
const gains: GainNode[] = []

masterGain.connect(audioCtx.destination)
audioCtx.suspend()
masterGain.gain.setValueAtTime(0, audioCtx.currentTime)

const fadeIn = () => {
  const now = audioCtx.currentTime
  masterGain.gain.linearRampToValueAtTime(1, now + attackTime)
}

const fadeOut = () => {
  const now = audioCtx.currentTime
  masterGain.gain.linearRampToValueAtTime(0, now + releaseTime)
}

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
  const [freq, setFreq] = useState(220)
  useEffect(() => {
    amplitudes.map((a, i): void => {
      const g = gains[i]
      const osc = oscillators[i]
      g.gain.setValueAtTime(a * 0.9, audioCtx.currentTime)
      osc.frequency.value = freq
    })
  }, [amplitudes, freq, frequencies])

  return (
    <div>
      <button onClick={() => audioCtx.resume()}>Start Sound</button>
      <button onClick={() => audioCtx.suspend()}>Stop Sound</button>
      <Keyboard
        onKeyPressed={(f: number) => {
          setFreq(f)
          fadeIn()
        }}
        onKeyReleased={() => fadeOut()}
      />
    </div>
  )
}

export default Sound
