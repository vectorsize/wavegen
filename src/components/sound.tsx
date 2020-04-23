import React, { useState, useEffect } from 'react'

import Keyboard from './keyboard'
import { numHarmonics } from './constants'
import Button from './button'
import { SoundIcon, SoundOffIcon } from './icons/index'

type SoundProps = {
  amplitudes: number[]
  frequencies: number[]
  sampleRate: number
  iconWidth: number
  iconHeight: number
}

const attackTime = 0.15
const releaseTime = 0.15

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

const Sound = ({
  amplitudes,
  frequencies,
  iconWidth,
  iconHeight,
}: SoundProps) => {
  const [freq, setFreq] = useState(220)

  useEffect(() => {
    if (!freq) return
    amplitudes.map((a, i): false => {
      const g = gains[i]
      const osc = oscillators[i]
      g.gain.linearRampToValueAtTime(a * 0.9, audioCtx.currentTime)
      osc.frequency.value = freq
      return false
    })
  }, [amplitudes, freq, frequencies])

  return (
    <div>
      <Button onClick={() => audioCtx.resume()}>
        <SoundIcon width={iconWidth} height={iconHeight} />
      </Button>
      <Button onClick={() => audioCtx.suspend()}>
        <SoundOffIcon width={iconWidth} height={iconHeight} />
      </Button>
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
