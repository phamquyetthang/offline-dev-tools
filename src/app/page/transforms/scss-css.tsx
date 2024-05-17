import TransformLayout from '@app/components/layouts/transform'
import { useCallback, useState } from 'react'
import * as Sass from 'sass.js/dist/sass.sync';


const SCSS_CSS = () => {
  const [scss, setSCSS] = useState(
    `$primary-color: #ff0000;
$secondary-color: #00ff00;

.container {
  background-color: $primary-color;
  color: $secondary-color;
}`
  )
  const [css, setCSS] = useState(``)

  const onTransform = useCallback(
    () => {
      (Sass as any).compile(scss, async function (result: { text: string }) {
        setCSS(result.text)
      });
    },
    [scss, css]
  )

  return (
    <TransformLayout
      inputProps={{
        input: scss,
        onChangeInput: (v) => setSCSS(v || ''),
        inputLang: 'scss',
        inputTitle: 'SCSS'
      }}
      outputProps={{
        output: css,
        outputLang: 'css',
        onChangeOutput: (v) => setCSS(v || ''),
        outputTitle: 'CSS'
      }}
      title="SCSS ⇌ CSS transform tool"
      onTransform={onTransform}
    />
  )
}

export default SCSS_CSS
