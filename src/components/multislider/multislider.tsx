import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

import { shimEvent, checkInside } from './utils'
import Slider from './slider'

interface MultiProps {
  width?: number
  height?: number
}

const Multi = styled.div<MultiProps>`
  display: flex;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  justify-content: space-between;
  border: 1px solid;
  cursor: pointer;
`

const MultiSlider = (props: any) => {
  const {
    knobs,
    orientation,
    onChange,
    width,
    height,
    knobSize,
    valuesX,
    valuesY,
  } = props

  const knobData = new Array(knobs).fill(0).map((v, i) => i)

  const ref = useRef<any>(false)

  const [isMouseDown, setMouseDown] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const onMouseDown = useCallback((e) => {
    //console.log('MULTISLIDER::onMouseDown')

    const event = shimEvent(e)
    const pos = {
      x: event.pageX,
      y: event.pageY,
    }
    const el = ref.current
    const rect = el.getBoundingClientRect()
    if (checkInside(pos, rect)) {
      setPosition(pos)
      setMouseDown(true)
    }
  }, [])

  const onMouseUp = useCallback((e) => {
    //console.log('MULTISLIDER::onMouseUp')
    setMouseDown(false)
  }, [])

  const onMouseMove: any = useCallback(
    (e: any) => {
      if (isMouseDown) {
        //console.log('MULTISLIDER::onMouseMove isMouseDown')
        const event = shimEvent(e)
        setPosition({
          x: event.pageX,
          y: event.pageY,
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isMouseDown]
  )

  // DidMount
  // --
  useEffect(() => {
    //console.log('MULTISLIDER::didmount')
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //console.log('MULTISLIDER::render')

  return (
    <Multi ref={ref} width={width} height={height}>
      {knobData.map((k) => (
        <Slider
          valueX={(valuesX && valuesX[k]) || null}
          valueY={(valuesY && valuesY[k]) || null}
          position={position}
          isMouseDown={isMouseDown}
          background="rgba(0,0,0,0.2)"
          key={`slider${k}`}
          border={false}
          container={ref}
          orientation={orientation}
          height={height}
          width={width / knobs}
          size={knobSize}
          onChange={(x: number, y: number) => {
            onChange(k, x, y)
          }}
        />
      ))}
    </Multi>
  )
}

export default MultiSlider
