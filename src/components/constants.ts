import { makeSine, makeSquare, makeSaw, makeTriangle } from '../presets'
import { freqs } from '../lib/utils'

// Constants
// --
export const numHarmonics = 16
export const fundamental = 440
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
