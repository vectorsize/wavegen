import React from 'react'
import styled from 'styled-components'

import saveArray from '../lib/saveBuffer'
import { SaveIcon } from './icons/index'

type DownloadProps = {
  name: string
  buffer: number[]
  sampleRate: number
  length: number
  iconWidth: number
  iconHeight: number
}

const A = styled.a`
  text-decoration: none;
  color: white;
  border: 1px solid;
  padding: 3px;
`

const DownloadLink = (props: DownloadProps) => {
  const { name, buffer, sampleRate, length, iconWidth, iconHeight } = props
  const href = URL.createObjectURL(saveArray(buffer, sampleRate, length))

  return (
    <A download={name} href={href}>
      <SaveIcon width={iconWidth} height={iconHeight} />
    </A>
  )
}

export default DownloadLink
