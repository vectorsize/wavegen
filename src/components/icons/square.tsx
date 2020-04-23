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
    <g
      id="Page-1"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <polyline
        id="square"
        stroke="#FFFFFF"
        points="1 7 1 1 13 1 13 13 25 13 25 7"
      ></polyline>
    </g>
  </svg>
)

export default Icon
