import React from 'react'

const Icon = (props: any) => (
  <svg
    width={`${props.width}px`}
    height={`${props.height}px`}
    viewBox={`0 0 ${props.width}px ${props.height}px`}
    version="1.1"
    // xmlns="http://www.w3.org/2000/svg"
    // xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <polyline
      id="saw"
      stroke="#FFFFFF"
      points="1 9 1 1 25 15 25 6.93774225"
    ></polyline>
  </svg>
)

export default Icon
