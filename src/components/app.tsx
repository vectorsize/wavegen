import React, { useState } from 'react'
import styled from 'styled-components'

import Slider from './slider'
import Waveform from './waveform'

import {
  harms,
  initAmps,
  oscillators,
  freqs,
  allSines,
  normalize,
  setAmplitude
} from '../lib/utils'

// Constants
// --
// const SINE =
const width = 300
const height = 200

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

function Main() {
  const [gain, setGain] = useState(1)
  const [fundamental, setFundamental] = useState(440)
  const [numHarmonics, setNumHarmonics] = useState(10)
  const [sampleRate, setSampleRate] = useState(44100)
  const [amplitudes, setAmplitudes] = useState(initAmps(numHarmonics))

  const update = setAmplitude([amplitudes, setAmplitudes])

  const allFrequencies = freqs(numHarmonics, fundamental)
  const allOscillators = oscillators(numHarmonics, fundamental, sampleRate)
  const allSinewaves = allSines(allOscillators, amplitudes)
  const harmonics = harms(numHarmonics)

  // only normalize when more than 1 tables populated
  const populated: boolean = amplitudes.filter(Boolean).length > 1
  const normalizedData = populated ? normalize(allSinewaves) : allSinewaves

  return (
    <App>
      <Waveform
        width={width}
        height={height}
        data={normalizedData}
        lineWidth={2}
        amp={0.8}
      />
      <Harmonies>
        {harmonics.map((h) => (
          <VerticalSlider
            onChange={(e) => {
              update(h, e)
            }}
            step={0.01}
          />
        )
        )}
      </Harmonies>
    </App>
  )
}

export default Main
