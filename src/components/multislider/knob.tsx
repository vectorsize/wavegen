import styled from 'styled-components'

interface KnobProps {
  size: number
  left: number
  top: number
  actor?: boolean
}
const Knob = styled.div<KnobProps>`
  user-select: none;
  pointer-events: none;
  cursor: ${(props) => (props.actor ? 'pointer' : 'default')};
  position: absolute;
  border: none;
  top: 0;
  left: 0;
  transform: translate(
    ${(props: any) => props.left}px,
    ${(props: any) => props.top}px
  );
  margin: 0;
  padding: 0;
  width: ${(props: any) => props.size}px;
  height: ${(props: any) => props.size}px;
  background-color: ${(props: any) => props.color};
`

export default Knob
