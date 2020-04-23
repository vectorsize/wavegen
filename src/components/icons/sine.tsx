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
    <path
      d="M1,6.90959204 C5.23529412,-0.413975594 8.13269799,-1.50682828 13,6.90959204 C17.867302,15.3260124 20.7647059,14.2331597 25,6.90959204"
      id="sine"
      stroke="#FFFFFF"
      fill-rule="nonzero"
    ></path>
  </svg>
)

export default Icon
