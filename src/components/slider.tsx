import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const Input = styled.div`
  display: flex;
  flex-direction: row;
  width: 20px;
`

type SliderProps = {
  value: number
  label?: string
  min?: number
  max?: number
  step?: number
  uiValue?: number
  onChange: (v: number) => void
  unit?: string
  className?: string
}

const Slider = (props: SliderProps) => {
  const {
    label = '',
    unit = '',
    min = 0,
    max = 1,
    step = 0.1,
    uiValue = 0,
    value,
    onChange,
    className = '',
  } = props

  const update = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(Number(e.target.value))

  return (
    <Input className={className}>
      {label} {unit}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={update}
        value={value}
      />
      {label && <span>{uiValue || value}</span>}
    </Input>
  )
}

export default Slider
