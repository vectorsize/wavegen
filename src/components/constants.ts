import { makeSine, makeSquare, makeSaw, makeTriangle } from '../presets'
import { freqs } from '../lib/utils'

// Constants
// --
export const numHarmonics = 16
export const fundamental = 220
export const width = 300
export const height = 200
export const sampleRates = [22050, 44100, 48000, 88200, 96000]
export const bits = [8, 16, 24, 32]
export const tableSizes = [128, 256, 512, 1024, 2048, 4096]
// Presets
export const SINE = makeSine(numHarmonics)
export const SQUARE = makeSquare(numHarmonics)
export const SAW = makeSaw(numHarmonics)
export const TRIANGLE = makeTriangle(numHarmonics)
export const frequencies = freqs(numHarmonics, fundamental)

export const RAND = new Array(numHarmonics).fill(0).map((v) => Math.random())
export const RANDHARM = new Array(numHarmonics)
  .fill(0)
  .map((v) => Math.random())
  .map((v, i) => (i % 2 === 1 ? 0 : v))

const waves = [SINE, SQUARE, TRIANGLE, SINE, SINE, RAND, RANDHARM]

export const randomAmps = (): number[] =>
  new Array(numHarmonics).fill(0).map((_, i) => {
    const wi = parseInt(`${(Math.random() * 10) % waves.length}`)
    const wave = waves[wi]
    return wave[i]
  })
