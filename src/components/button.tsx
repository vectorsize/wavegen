import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  border: 1px solid;
  padding: 3px;
  margin-bottom: 2px;
  background-color: black;
  background-repeat: no-repeat;
  background-size: contain;
  width: 24px;
  height: 24px;
  background-position: center;
  color: transparent;
  cursor: ${(props: any) => (props.disabled ? 'default' : 'pointer')};
`

const Button = (props: any) => <StyledButton {...props} />

export default Button
