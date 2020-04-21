import React from 'react'
import saveArray from '../lib/saveBuffer'

type DownloadProps = {
  name: string
  buffer: number[]
  sampleRate: number
  length: number
}

const DownloadLink = (props: DownloadProps) => {
  const { name, buffer, sampleRate, length } = props
  const href = URL.createObjectURL(saveArray(buffer, sampleRate, length))

  return (
    <a download={name} href={href}>
      Download
    </a>
  )
}

export default DownloadLink
