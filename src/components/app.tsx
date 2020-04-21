import React, { useState } from 'react'
import styled from 'styled-components'

import Slider from './slider'
import Waveform from './waveform'
import Dropdown from './dropdown'
import Sound from './sound'

import {
  harms,
  oscillators,
  allSines,
  normalize,
  setAmplitude,
} from '../lib/utils'

import {
  numHarmonics,
  fundamental,
  width,
  height,
  sampleRates,
  bits,
  tableSizes,
  SINE,
  SQUARE,
  SAW,
  TRIANGLE,
  randomAmps,
  frequencies,
} from './constants'

// Components
// --
const App = styled.div`
  display: flex;
  flex-direction: column;
`

const Harmonies = styled.div`
  display: flex;
  flex-direction: row;
  width: 30%;
  /* sizing gets messed up by the transform in the sliders */
  margin-top: 130px;
`

const VerticalSlider = styled(Slider)`
  transform: rotate(-90deg);
`

const Settings = styled.div``

const Button = styled.button``

// App
// --
function Main() {
  const [sampleRate, setSampleRate] = useState(44100)
  const [bitRate, setBitRate] = useState(bits[3])
  const [amplitudes, setAmplitudes] = useState(SINE)
  const [tableSize, setTableSize] = useState(1024)

  const update = setAmplitude([amplitudes, setAmplitudes])

  const allOscillators = oscillators(
    numHarmonics,
    fundamental,
    sampleRate,
    tableSize
  )

  const allSineWaves = allSines(allOscillators, amplitudes)
  const harmonics = harms(numHarmonics)

  // only normalize when more than 1 tables populated
  const populated: boolean = amplitudes.filter(Boolean).length > 1
  const normalizedData = populated ? normalize(allSineWaves) : allSineWaves

  return (
    <App>
      <Sound {...{ amplitudes, frequencies, sampleRate }} />
      <Settings>
        Settings
        <Dropdown
          options={sampleRates}
          label={'Sample Rate'}
          selected={sampleRate}
          onChange={setSampleRate}
        />
        <Dropdown
          options={bits}
          label={'Bit Depth'}
          selected={bitRate}
          onChange={setBitRate}
          selectTitle={(BR: number) =>
            `${BR}${BR === 32 ? '-bit float' : '-bit'}`
          }
        />
        <Dropdown
          options={tableSizes}
          label={'Cycle Length'}
          selected={tableSize}
          onChange={setTableSize}
        />
      </Settings>
      <Waveform
        width={width}
        height={height}
        data={normalizedData}
        lineWidth={2}
        amp={0.8}
      />
      <div>
        <Button onClick={() => setAmplitudes(SINE)}>Sine</Button>
        <Button onClick={() => setAmplitudes(TRIANGLE)}>Triangle</Button>
        <Button onClick={() => setAmplitudes(SAW)}>Saw</Button>
        <Button onClick={() => setAmplitudes(SQUARE)}>Square</Button>
        <Button onClick={() => setAmplitudes(randomAmps())}>Random</Button>
      </div>
      <Harmonies>
        {harmonics.map((h) => (
          <VerticalSlider
            key={`slider${h}`}
            onChange={(e) => {
              update(h, e)
            }}
            value={amplitudes[h]}
            step={0.01}
          />
        ))}
      </Harmonies>
    </App>
  )
}

export default Main
