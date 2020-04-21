import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  border: 1px solid;
  padding: 3px;
  margin-bottom: 2px;
  cursor: ${(props: any) => (props.disabled ? 'default' : 'pointer')};
`

const Button = (props: any) => <StyledButton {...props} />

export default Button
