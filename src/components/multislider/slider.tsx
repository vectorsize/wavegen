import React, { Component, createRef } from 'react'
import styled from 'styled-components'

import { clamp, checkInside } from './utils'

interface TrackProps {
  width: number
  height: number
  backgroundColor: string
}

const Track = styled.div<TrackProps>`
  pointer-events: none;
  position: relative;
  border: none;
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  background-color: ${(p) => p.backgroundColor};
`
interface KnobProps {
  size: number
  top: number
  color: string
}
const Knob = styled.div<KnobProps>`
  pointer-events: none;
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  top: ${(p) => p.top}px;
  background-color: ${(p) => p.color};
  border-radius: 100%;
`
interface SlideProps {
  height: number
  width: number
  slideColor: string
}
const Slide = styled.div<any>`
  position: relative;
  pointer-events: none;
  background-color: ${(p) => p.slideColor};
  height: ${(p) => p.height}px;
  top: ${(p) => p.top}px;
  left: ${(p) => p.left}px;
  width: ${(p) => p.width}px;
`

const SLEW = 5

class Slider extends Component<any, any> {
  ref: any = null

  state: any = {
    refPosition: {
      top: null,
      left: null,
    },
    knobPosition: 0,
  }

  constructor(props: any) {
    super(props)
    this.ref = createRef<any>()
  }

  componentDidMount() {
    const { ref, setRefPosition } = this
    const { refPosition } = this.state
    if (ref.current) {
      if (refPosition.top == null) {
        const el = ref.current
        const rect = el.getBoundingClientRect()
        setRefPosition({ top: rect.top, left: rect.left })
      }
    }
  }

  setRefPosition = (refPosition: {
    top: number | null
    left: number | null
  }) => {
    this.setState({ refPosition })
  }

  setKnobPosition = (knobPosition: number) => {
    this.setState({ knobPosition })
  }

  componentDidUpdate() {
    const { setKnobPosition } = this
    const {
      position,
      width,
      height,
      knobSize,
      onChange,
      mouseDown,
      value,
    } = this.props
    const { refPosition, knobPosition } = this.state
    const halfKnob = knobSize * 0.5
    const dimensions = { width, height, ...refPosition }
    if (mouseDown) {
      if (checkInside(position, dimensions)) {
        const newPos = clamp(
          position.y - refPosition.top - halfKnob,
          0,
          height - knobSize
        )
        const delta = Math.abs(knobPosition - newPos)
        if (delta >= SLEW) {
          setKnobPosition(newPos)
          const newValue = 1 - (newPos + halfKnob) / height
          onChange && onChange(newValue)
        }
      }
    } else {
      const val = height - value * height
      const newPos = clamp(val - halfKnob, 0, height - knobSize)
      if (knobPosition !== newPos) {
        setKnobPosition(newPos)
      }
    }
  }

  render() {
    const { ref } = this
    const {
      width,
      height,
      knobSize,
      color,
      backgroundColor,
      slideColor,
    } = this.props
    const { knobPosition } = this.state

    const w = 3
    const halfKnob = knobSize * 0.5
    const halfWidth = w * 0.5

    return (
      <Track
        ref={ref}
        width={width}
        height={height}
        backgroundColor={backgroundColor}
      >
        <Knob size={knobSize} top={knobPosition} color={color} />
        <Slide
          width={w}
          left={halfKnob - halfWidth}
          top={knobPosition - knobSize}
          height={height - knobPosition}
          slideColor={slideColor}
        />
      </Track>
    )
  }
}

export default Slider
