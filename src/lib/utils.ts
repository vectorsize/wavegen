import { TWO_PI } from '../components/constants'
// data
// --
export const harms = (nHarmonics: number): number[] =>
  new Array(nHarmonics).fill(0).map((_, i) => i)

const makeSine = (freq: number, amp: number, size: number) =>
  new Array(size)
    .fill(0)
    .map((_, i) => i)
    .map((i: number) => {
      return Math.cos(((i * freq) / size) * TWO_PI) * amp
    })

export const allSines = (
  nHarmonics: number,
  amplitudes: number[],
  tableSize: number
): number[] =>
  new Array(nHarmonics)
    .fill(0)
    .map((_, i) => i)
    .map((v, i) => makeSine(i + 1, amplitudes[v], tableSize))
    .reduce((all, v) => v.map((l, i) => (all[i] ? all[i] + l : l)), [])

export const scale = (
  value: number,
  istart: number,
  istop: number,
  ostart: number,
  ostop: number
): number => ostart + (ostop - ostart) * ((value - istart) / (istop - istart))

export const normalize = (l: number[]): number[] => {
  const max = Math.max(...l)
  const min = Math.min(...l)

  return l.map((v) => scale(v, min, max, -1, 1))
}

// helpers
// --
export const setAmplitude = ([list, cb]: any) => (idx: number, val: number) =>
  cb(list.map((a: number, i: number) => (i === idx ? val : a)))
