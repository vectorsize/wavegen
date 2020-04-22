import React, { createRef, useEffect } from 'react'
import styled from 'styled-components'

const Canvas = styled.canvas`
  border: 1px solid;
`

type WaveformProps = {
  data: number[]
  width?: number
  height?: number
  lineWidth?: number
  strokeStyle?: string
}

const Waveform = (props: WaveformProps) => {
  const {
    data = [],
    width = 100,
    height = 100,
    lineWidth = 3,
    strokeStyle = 'red',
  } = props

  const canvasRef = createRef<HTMLCanvasElement>()
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D
      ctx.clearRect(0, 0, width, height)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle
      const vPos = height * 0.5
      const tableSize = data.length
      const step = tableSize / width
      // always start in first sample
      const start = data[0] * vPos + vPos

      ctx.beginPath()
      ctx.moveTo(0, start)

      for (let x = 0; x < width; x++) {
        const y = data[Math.ceil(x * step)] * vPos + vPos
        ctx.lineTo(x, y)
      }

      ctx.stroke()
      ctx.closePath()
    }
  }, [canvasRef, data, height, lineWidth, strokeStyle, width])

  return <Canvas width={`${width}px`} height={`${height}px`} ref={canvasRef} />
}
export default Waveform
