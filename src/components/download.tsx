import React from 'react'
import styled from 'styled-components'

import saveArray from '../lib/saveBuffer'

type DownloadProps = {
  name: string
  buffer: number[]
  sampleRate: number
  length: number
}

const A = styled.a`
  text-decoration: none;
  color: black;
  border: 1px solid;
  padding: 3px;
`

const DownloadLink = (props: DownloadProps) => {
  const { name, buffer, sampleRate, length } = props
  const href = URL.createObjectURL(saveArray(buffer, sampleRate, length))

  return (
    <A download={name} href={href}>
      Download
    </A>
  )
}

export default DownloadLink
