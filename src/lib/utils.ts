
import Oscillator from '../lib/oscillator'

// data
// --
export const harms = (nHarmonics: number): number[] => new Array(nHarmonics)
  .fill(0)
  .map((_, i) => i)

export const initAmps = (nHarmonics: number): number[] => new Array(nHarmonics)
  .fill(0
  )

export const oscillators = (nHarmonics: number, F: number, SR: number): number[][] => new Array(nHarmonics)
  .fill(0)
  .map((_, i) => new Oscillator((i + 1) * F, SR).sine())

export const freqs = (nHarmonics: number, F: number): number[] => new Array(nHarmonics)
  .fill(0)
  .map((_, i) => (i + 1) * F)

export const allSines = (oscillators: number[][], amplitudes: number[]): number[] => oscillators
  .map((o, i) => o
    .map(f => f * amplitudes[i]))
  .reduce((added, v) => {
    v.map((f, i) => {
      added[i] = added[i] ? added[i] + f : f
    })
    return added
  }, [])

export const scale = (value: number, istart: number, istop: number, ostart: number, ostop: number): number =>
  ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

export const normalize = (l: number[]): number[] => {
  const max = Math.max(...l)
  const min = Math.min(...l)

  return l.map(v => scale(v, min, max, -1, 1))
}


// helpers
// --
export const setAmplitude = ([list, cb]: any) => (idx: number, val: number) =>
  cb(list.map((a: number, i: number) => (i === idx ? val : a)))
