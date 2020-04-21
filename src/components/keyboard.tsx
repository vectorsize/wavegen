import { useState, useEffect, useCallback } from 'react'

type KeyMapType = {
  [key: string]: number
}

type FreqMapType = {
  [key: string]: boolean
}

type KeyDownsType = {
  [key: string]: boolean
}
type KeyboardProps = {
  onKeyPressed: (n: number) => void
  onKeyReleased: () => void
}

const keyMap: FreqMapType = {
  A: false,
  S: false,
  D: false,
  F: false,
  G: false,
  H: false,
  J: false,
  K: false,
  L: false,
}

const freqMap: KeyMapType = {
  A: 220.0,
  S: 246.94,
  D: 293.66,
  F: 329.63,
  G: 349.23,
  H: 392.0,
  J: 493.88,
  K: 523.25,
  L: 587.33,
}

const Keyboard = (props: KeyboardProps) => {
  const [keys, setKeys] = useState(keyMap)
  const [freq, setFreq] = useState(220)
  const keyDown = Object.keys(keys).filter((k) => keys[k]).length > 0

  const onKeyDown = useCallback(
    (e) => {
      const key = e.code.replace('Key', '')
      setFreq(freqMap[key])
      if (keys[key] === false) {
        setKeys(
          Object.keys(keys).reduce(
            (r, k) => ({ ...r, ...{ [key]: true } }),
            keys
          )
        )
      }
    },
    [keys]
  )

  const onKeyUp = useCallback(
    (e) => {
      const key = e.code.replace('Key', '')
      if (keys[key] === true) {
        setKeys(
          Object.keys(keys).reduce(
            (r, k) => ({ ...r, ...{ [key]: false } }),
            keys
          )
        )
      }
    },
    [keys]
  )

  useEffect(() => {
    if (keyDown) {
      props.onKeyPressed(freq)
    } else {
      props.onKeyReleased()
    }
  }, [freq, keyDown, props])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  })

  return null
}

export default Keyboard
