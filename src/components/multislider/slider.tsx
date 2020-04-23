import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import Knob from './knob'
import { clamp, checkInside } from './utils'

interface WrapProps {
  width: number
  height: number
  background?: string
  actor?: boolean
  border?: boolean
}
const Wrap = styled.div<WrapProps>`
  user-select: none;
  pointer-events: none;
  cursor: ${(props) => (props.actor ? 'pointer' : 'default')};
  position: relative;
  width: ${(props: any) => props.width}px;
  height: ${(props: any) => props.height}px;
  border: ${(props: any) => (props.border ? '1px solid' : 'none')};
  background-color: ${(props: any) => props.background};
`

const Slider = (props: any) => {
  const {
    width,
    height,
    size,
    onChange,
    orientation,
    container,
    border,
    background,
    position,
    isMouseDown,
    valueY,
    valueX,
  } = props

  const ref = useRef<any>(null)
  const [dimensions, setDimensions]: [any, any] = useState({
    top: null,
    width: null,
    left: null,
    height: null,
  })
  const [isInside, setIsInside] = useState(false)
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (ref.current) {
      if (dimensions.top == null) {
        console.log('SLIDER::setDimensions')
        const el = ref.current
        const rect = el.getBoundingClientRect()
        setDimensions({
          top: rect.top,
          width: rect.width,
          left: rect.left,
          height: rect.height,
        })
      }
    }
  }, [container, dimensions, valueY, valueX])

  useEffect(() => {
    if (isMouseDown) {
      console.log('SLIDER::isMouseDown')
      setIsInside(checkInside(position, dimensions))
    } else {
      console.log('SLIDER::isMouseUp')
      setIsInside(false)
    }
  }, [dimensions, isMouseDown, position, valueY, valueX])

  useEffect(() => {
    if (isInside) {
      console.log('SLIDER::isInside')

      const x =
        orientation === 'horizontal'
          ? clamp(position.x - size * 1.5, 0, dimensions.width - size)
          : 0
      const xVal =
        orientation === 'horizontal'
          ? clamp(position.x - dimensions.left, 0, dimensions.width) /
            dimensions.width
          : 0

      const y =
        orientation === 'vertical'
          ? clamp(position.y - size * 1.5, 0, dimensions.height - size)
          : 0
      const yVal =
        orientation === 'vertical'
          ? clamp(position.y - dimensions.top, 0, dimensions.height) /
            dimensions.height
          : 0

      onChange && onChange(xVal, yVal)
      if (valueY) {
        console.log('SLIDER::onChangeY')
        // console.log(value)
        setKnobPos({ x, y: valueY * dimensions.height })
      }
      if (valueX) {
        console.log('SLIDER::onChangeX')
        // console.log(value)
        setKnobPos({ x: valueX * dimensions.width, y })
      }
      if (!valueX && !valueY) {
        console.log('SLIDER::onChangeXY')
        setKnobPos({ x, y })
      }
    }
  }, [
    dimensions,
    isInside,
    onChange,
    size,
    orientation,
    position,
    valueY,
    valueX,
  ])

  return (
    <Wrap
      {...{ width, height, actor: !container, border, background }}
      ref={ref}
    >
      <Knob {...{ size }} left={knobPos.x} top={knobPos.y} color="black" />
    </Wrap>
  )
}

export default Slider
