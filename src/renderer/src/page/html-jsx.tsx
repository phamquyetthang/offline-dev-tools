import TransformLayout from '@renderer/components/layouts/transform'
import HtmlToJsx from 'htmltojsx'
import { useState } from 'react'
// import { renderToStaticMarkup } from 'react-dom/server'

const HTML_JSX = () => {
  const [html, setHtml] = useState(``)
  const [jsx, setJsx] = useState(``)

  return (
    <TransformLayout
      input={html}
      onChangeInput={(v) => setHtml(v || '')}
      output={jsx}
      onChangeOutput={(v) => setJsx(v || '')}
      title="HTML ⇌ JSX transform tool"
      inputTitle="HTML"
      outputTitle="JSX"
      onTransform={(isRevert) => {
        console.log("🚀 ~ isRevert:", isRevert)
        const converter = new HtmlToJsx({
          createClass: false
        });
  
        // isRevert ? setJsx(parser.parse(html)) : setHtml(renderToStaticMarkup(jsx))
        console.log('🚀 ~ parser.parse(html):', `export const Foo = () => (${ converter.convert(html)})`)
      }}
    />
  )
}

export default HTML_JSX
