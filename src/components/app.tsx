import React, { useState } from 'react'
import styled from 'styled-components'

import Wave from './waveform'
import Dropdown from './dropdown'
import Sound from './sound'
import DownloadLink from './download'
import Button from './button'
import MultiSlider from './multislider'

import { harms, normalize, setAmplitude } from '../lib/utils'

import {
  numHarmonics,
  defaultTableSize,
  fundamental,
  width,
  height,
  sampleRates,
  bits,
  tableSizes,
  SINE,
  SQUARE,
  SAW,
  randomAmps,
} from './constants'

// Components
// --
const App = styled.div`
  display: flex;
  flex-direction: column;
`

const Waveform = styled(Wave)`
  margin-bottom: 3px;
`

const Settings = styled.div`
  border: 1px solid;
  margin: 3px 0;
  padding: 3px;
`

const TWO_PI = 2 * Math.PI
const PIO_TWO = Math.PI * 0.5

const makeSine = (freq: number, amp: number, tableSize: number) => {
  return new Array(tableSize)
    .fill(0)
    .map((_, i) => i)
    .map((i) => {
      return Math.cos(((i * freq) / tableSize) * TWO_PI + PIO_TWO) * amp
    })
}

function Main() {
  const [sampleRate, setSampleRate] = useState(44100)
  const [bitRate, setBitRate] = useState(bits[3])
  const [amplitudes, setAmplitudes] = useState(SINE)
  const [tableSize, setTableSize] = useState(defaultTableSize)

  const update = setAmplitude([amplitudes, setAmplitudes])
  const dataStructure = new Array(numHarmonics).fill(0).map((_, i) => i)

  const allWaves = dataStructure.map((i) => {
    const f = i + 1
    const amp = amplitudes[i]
    return makeSine(f, amp, tableSize)
  })

  const frequencies = dataStructure.map((i) => {
    return fundamental * i
  })

  let allData: number[] = []
  for (let h = 0; h < numHarmonics; h++) {
    for (let i = 0; i < tableSize; i++) {
      const d = Number(allWaves[h][i]) + Number(allWaves[h][i])
      if (allData[i]) {
        allData[i] = allData[i] + d
      } else {
        allData[i] = d
      }
    }
  }

  allData = normalize(allData)

  // only normalize when more than 1 tables populated
  const populated: boolean = amplitudes.filter(Boolean).length > 1
  const normalizedData = populated ? normalize(allData) : allData
  // console.log(amplitudes)
  return (
    <App>
      <Sound {...{ amplitudes, frequencies, sampleRate }} />
      <Waveform
        width={width}
        height={height}
        data={normalizedData}
        lineWidth={2}
      />
      <div>
        <Button onClick={() => setAmplitudes(SINE)}>Sine</Button>
        <Button onClick={() => setAmplitudes(SAW)}>Saw</Button>
        <Button onClick={() => setAmplitudes(SQUARE)}>Square</Button>
        <Button onClick={() => setAmplitudes(randomAmps())}>Random</Button>
      </div>
      <MultiSlider
        knobs={numHarmonics}
        knobSize={300 / numHarmonics}
        width={300}
        height={100}
        values={amplitudes}
        onChange={(i: number, v: number) => {
          update(i, v)
        }}
      />
      <Settings>
        Export Settings
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
      <DownloadLink
        name="wave-table.wav"
        buffer={normalizedData}
        sampleRate={sampleRate}
        length={tableSize}
      />
    </App>
  )
}

export default Main
