import TransformLayout from '@renderer/components/layouts/transform'
import HTMLtoJSX from '@renderer/utils/html-to-jsx'
import { useCallback, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import parse from 'html-react-parser'

const converter = new HTMLtoJSX({})
const HTML_JSX = () => {
  const [html, setHtml] = useState(`<h1 class="welcome">Enter HTML code here</h1>`)
  const [jsx, setJsx] = useState(``)

  const onTransform = useCallback(
    (isRevert?: boolean) => {
      if (isRevert) {
        setHtml(renderToStaticMarkup(parse(jsx)))
      } else {
        setJsx(converter.convert(html))
      }
    },
    [html, jsx]
  )

  return (
    <TransformLayout
      inputProps={{
        input: html,
        onChangeInput: (v) => setHtml(v || ''),
        inputLang: 'html',
        inputTitle: 'HTML'
      }}
      outputProps={{
        output: jsx,
        outputLang: 'javascript',
        onChangeOutput: (v) => setJsx(v || ''),
        outputTitle: 'JSX'
      }}
      title="HTML ⇌ JSX transform tool"
      onTransform={onTransform}
      canRevert
    />
  )
}

export default HTML_JSX
