import TransformLayout from '@app/components/layouts/transform'
import { useCallback, useState } from 'react'
// import { transform } from '@svgr/core'

const SVG_JSX = () => {
  const [svg, setSvg] = useState(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
  `)

  const [jsx, setJsx] = useState(``)

  const onTransform = useCallback(() => {
    // transform(svg, { icon: true }, { componentName: 'ICon' }).then((jsCode) => {
    //   setJsx(jsCode)
    // })
  }, [svg])

  return (
    <TransformLayout
      inputProps={{
        input: svg,
        onChangeInput: (v) => setSvg(v || ''),
        inputLang: 'xml',
        inputTitle: 'SVG'
      }}
      outputProps={{
        output: jsx,
        outputLang: 'javascript',
        onChangeOutput: (v) => setJsx(v || ''),
        outputTitle: 'JSX'
      }}
      title="SVG to JSX transform tool"
      onTransform={onTransform}
      canRevert
    />
  )
}

export default SVG_JSX
