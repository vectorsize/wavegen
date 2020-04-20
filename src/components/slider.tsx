import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

const Input = styled.div`
  display: flex;
  flex-direction: row;
  width: 20px;
`

type SliderProps = {
  label?: string
  min?: number
  max?: number
  step?: number
  uiValue?: number
  onChange: (v: number) => void
  unit?: string,
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
    onChange,
    className = ''
  } = props

  const [value, setValue] = useState(0.0)

  const update = (e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    setValue(v)
    onChange(v)
  }

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
