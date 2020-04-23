import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
  createRef,
} from 'react'
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

type PropTypes = {
  knobs: number
  orientation?: string
  onChange: (index: number, x: number, y: number) => void
  width: number
  height: number
  knobSize: number
  valuesX?: number[]
  valuesY?: number[]
}

type State = {
  isMouseDown: boolean
  position: { x: number; y: number }
}

class MultiSlider extends Component<PropTypes, State> {
  ref: any = null
  knobData: number[] = []

  state: State = {
    isMouseDown: false,
    position: { x: 0, y: 0 },
  }

  defaultProps: PropTypes = {
    knobs: 1,
    orientation: 'vertical',
    onChange: () => {},
    width: 100,
    height: 100,
    knobSize: 10,
    valuesX: [],
    valuesY: [],
  }

  constructor(props: PropTypes) {
    super(props)
    const { knobs } = props
    this.ref = createRef<any>()
    this.knobData = new Array(knobs).fill(0).map((v, i) => i)
  }

  onMouseDown = (e: MouseEvent) => {
    const { setPosition, setMouseDown, ref } = this

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
  }

  onMouseUp = (e: MouseEvent) => {
    const { setMouseDown } = this
    setMouseDown(false)
  }

  onMouseMove = (e: MouseEvent) => {
    const { setPosition, state } = this
    const { isMouseDown } = state
    if (isMouseDown) {
      const event = shimEvent(e)
      setPosition({
        x: event.pageX,
        y: event.pageY,
      })
    }
  }

  setPosition = (position: { x: number; y: number }) => {
    this.setState({ position })
  }

  setMouseDown = (isMouseDown: boolean) => {
    this.setState({ isMouseDown })
  }

  componentWillUpdate() {
    const { knobs } = this.props
    this.knobData = new Array(knobs).fill(0).map((v, i) => i)
  }

  componentDidMount() {
    const { onMouseDown, onMouseUp, onMouseMove } = this
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)
  }

  componentWillUnmount() {
    const { onMouseDown, onMouseUp, onMouseMove } = this
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mousemove', onMouseMove)
  }

  render() {
    const { knobData, ref } = this
    const { position, isMouseDown } = this.state
    const {
      knobs,
      orientation,
      onChange,
      width,
      height,
      knobSize,
      valuesX,
      valuesY,
    } = this.props

    return (
      <Multi ref={ref} width={width} height={height}>
        {knobData.map((k: number) => (
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
}

export default MultiSlider
