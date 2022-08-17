export default function ConditionalRender({ cond, children }) {
  return cond ? children : null
}
