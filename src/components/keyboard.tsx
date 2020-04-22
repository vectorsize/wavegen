import { useState, useEffect, useCallback } from 'react'
// frequencies from https://www.inspiredacoustics.com/en/MIDI_note_numbers_and_center_frequencies

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
  Z: false,
  X: false,
  C: false,
  V: false,
  B: false,
  N: false,
  M: false,

  S: false,
  D: false,
  G: false,
  H: false,
  J: false,
  L: false,
}

const freqMap: KeyMapType = {
  Z: 130.81,
  X: 146.83,
  C: 164.81,
  V: 174.61,
  B: 196.0,
  N: 220.0,
  M: 246.94,

  S: 138.59,
  D: 155.56,
  G: 185.0,
  H: 207.65,
  J: 233.08,
  L: 277.18,
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
          Object.keys(keys)
            .filter((k: string) => k === key)
            .reduce((r, k) => ({ ...r, ...{ [key]: true } }), keys)
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
          Object.keys(keys)
            .filter((k: string) => k === key)
            .reduce((r, k) => ({ ...r, ...{ [key]: false } }), keys)
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
