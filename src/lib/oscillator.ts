export default class Oscillator {

  sampleRate: number = 44100
  tableSize: number = 1024
  frequency: number = 440
  amplitude: number = 1
  phase: number = 0
  TWO_PI: number = 2 * Math.PI
  table: number[] = []

  constructor(frequency: number, sr: number, size?: number) {
    // this.tableSize = size
    this.sampleRate = sr
    this.frequency = frequency
  }

  sine(_amp?: number) {
    const { TWO_PI, tableSize, frequency, amplitude, sampleRate } = this
    const amp = _amp ? _amp : amplitude

    for (let x = 0; x <= tableSize; x++) {
      const y = amp * Math.sin(this.phase)
      this.table.push(y)
      this.phase += ((TWO_PI * frequency) / sampleRate)
      if (this.phase > TWO_PI) this.phase = this.phase - TWO_PI
    }

    return this.table
  }
}