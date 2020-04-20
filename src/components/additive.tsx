import React, { createRef, useEffect } from 'react'
import styled from 'styled-components'

type AdditiveProps = {
  amp: number[],
  freq: number[],
  sampleRate: number,
  lineWidth?: number,
  strokeStyle?: string
}

const TWO_PI = Math.PI * 2

const Canvas = styled.canvas`
  width: 200px;
  border: 1px solid;
`

const scale = (height: number) => (y: number) => (y + 1) * (height / 2)
const last = (list: number[]): number => list[list.length - 1] || 0

const Additive = (props: AdditiveProps) => {
  const canvasref = createRef<HTMLCanvasElement>();
  const { amp, freq, sampleRate, lineWidth = 3, strokeStyle = 'red' } = props

  /**
   * TODO: separate sine generation from plotting
   * TODO: make the added sines together on the data side
   * TODO: render separately
   */

  useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current
      const { width, height } = canvas
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
      const scaleY = scale(height)

      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle

      ctx.clearRect(0, 0, width, height);

      let phase = 0
      let y = 0

      // ctx.beginPath();
      // // start position
      // ctx.moveTo(0, height / 2);

      // for (let x = 0; x <= width; x++) {
      //   // from previous sample
      //   ctx.moveTo(x, scaleY(y));

      //   y = amp * Math.sin(phase)

      //   phase += ((TWO_PI * freq) / sampleRate)
      //   if (phase > TWO_PI) phase = phase - TWO_PI

      //   // to current sample
      //   ctx.lineTo(x + 1, scaleY(y));
      // }

      // // end line
      // ctx.stroke();
      // ctx.closePath();
    }
  }, [amp, freq, sampleRate])

  return <Canvas ref={canvasref} />
}

export default Additive