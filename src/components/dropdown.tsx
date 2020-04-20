import React from 'react'
import styled from 'styled-components'

const Select = styled.select`
  border: none;
`

type DropDownProps = {
  label: string
  options: any[]
  selected: string | number
  onChange: (v: any) => any
  selectTitle?: (v: any) => any
}

const DropDown = (props: DropDownProps) => (
  <Select
    defaultValue={props.selected}
    onChange={(e) => props.onChange(Number(e.target.value))}
  >
    <option value="" disabled>
      {props.label}
    </option>
    {props.options.map((v: any): any => (
      <option key={`k-${v}`} value={v}>
        {(props.selectTitle && props.selectTitle(v)) || v}
      </option>
    ))}
  </Select>
)

export default DropDown
