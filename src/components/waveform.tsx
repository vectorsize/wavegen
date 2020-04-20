import React, { createRef, useEffect } from 'react'
import styled from 'styled-components'


const Canvas = styled.canvas`
  width: 200px;
  border: 1px solid;
  `

type WaveformProps = {
  data: number[],
  width?: number,
  height?: number,
  amp?: number,
  lineWidth?: number,
  strokeStyle?: string
}

const scale = (height: number) => (y: number) => (y + 1) * (height / 2)

const Waveform = (props: WaveformProps) => {
  const {
    data = [],
    width = 100,
    height = 100,
    amp = 1,
    lineWidth = 3,
    strokeStyle = 'red'
  } = props

  const canvasref = createRef<HTMLCanvasElement>();

  useEffect(() => {
    if (canvasref.current) {
      const canvas = canvasref.current
      // const { width, height } = canvas
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D
      const scaleY = scale(height)
      let y = 0

      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle

      ctx.clearRect(0, 0, width, height);

      ctx.beginPath();

      // start position
      ctx.moveTo(0, height / 2);

      for (let x = 0; x <= width; x++) {
        // from previous sample
        ctx.moveTo(x, scaleY(y));

        y = data[x] * amp

        // to current sample
        ctx.lineTo(x + 1, scaleY(y));
      }

      // end line
      ctx.stroke();
      ctx.closePath();
    }
  }, [amp, data])

  return <Canvas width={width} height={height} ref={canvasref} />
}
export default Waveform