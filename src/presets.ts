// Formulas found in
// https://legacy.earlham.edu/~tobeyfo/musictechnology/3_Harmonics_AddSynth_edit.html
// https://en.wikibooks.org/wiki/Sound_Synthesis_Theory/Additive_Synthesis

const inv = (n: number) => 1 / n
const sq = (n: number) => n * n

export const makeSine = (numHarmonics: number) =>
  [1].concat(new Array(numHarmonics - 1).fill(0))

export const makeSquare = (numHarmonics: number) =>
  [1].concat(
    new Array(numHarmonics - 1)
      .fill(0)
      .map((v, i) => ((i + 1) % 2 === 0 ? inv(i + 2) : v))
  )

export const makeSaw = (numHarmonics: number) =>
  [1].concat(new Array(numHarmonics - 1).fill(0).map((v, i) => inv(i + 2)))

const odds = (numHarmonics: number) =>
  new Array(numHarmonics)
    .fill(0)
    .map((v, n) => n + 1)
    .filter((i, n) => i % 2 === 0)
    .reduce(
      (all: any, v, n) => ({ ...all, ...{ [v]: (n + 1) % 2 === 1 ? -1 : 1 } }),
      {}
    )

export const makeTriangle = (numHarmonics: number) =>
  [1].concat(
    new Array(numHarmonics - 1)
      .fill(0)
      .map((v, n) => n + 1)
      .map((v, i) =>
        (i + 1) % 2 === 0 ? inv(sq(i + 2)) * (odds(numHarmonics)[v] || 1) : 0
      )
  )
