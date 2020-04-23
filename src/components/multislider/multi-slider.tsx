import React, { Component, createRef } from 'react'
import styled from 'styled-components'

import { checkInside } from './utils'
import Slider from './slider'

export const shimEvent = (event: any) => {
  let eventDoc, doc, body
  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document
    doc = eventDoc.documentElement
    body = eventDoc.body

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0)
  }
  return event
}

const Wrapper = styled.div<any>`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
  position: relative;
  display: flex;
  justify-content: space-between;
`

class MultiSlider extends Component<any, any> {
  ref: any = null
  slidersData: number[] = []

  state: any = {
    isMouseDown: false,
    position: { x: 0, y: 0 },
  }

  constructor(props: any) {
    super(props)
    const { knobs } = props
    this.ref = createRef<any>()
    this.slidersData = new Array(knobs).fill(0).map((v, i) => i)
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
    const { slidersData } = this
    const { position, isMouseDown } = this.state
    const { width, height, knobs, onChange, values } = this.props
    const padding = 2
    const sliderWidth = width / knobs + padding

    return (
      <Wrapper ref={this.ref} width={width} height={height}>
        {slidersData.map((s) => {
          return (
            <Slider
              mouseDown={isMouseDown}
              key={`slider${s}`}
              knobSize={10}
              width={sliderWidth}
              height={height}
              position={position}
              value={values[s]}
              onChange={(v: number) => onChange(s, v)}
            />
          )
        })}
      </Wrapper>
    )
  }
}

export default MultiSlider
