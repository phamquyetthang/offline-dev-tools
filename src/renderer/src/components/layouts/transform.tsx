import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/ui/card'
import { ArrowLeftRight, ArrowRightLeft, Columns2, Rows2 } from 'lucide-react'
import Editor from '@monaco-editor/react'
import './transform.css'
import { useState } from 'react'
import clsx from 'clsx'

const options = {
  lineNumbersMinChars: 2,
  lineDecorationsWidth: 0,
  minimap: {
    enabled: false
  },
  automaticLayout: true
}

interface IProps {
  input: string
  output: string
  title: string
  onTransform: (isRevert?: boolean) => void
  onChangeInput: (input?: string) => void
  onChangeOutput: (output?: string) => void
  inputLang?: string
  outputLang?: string
  inputDesc?: string
  outputDesc?: string
  inputTitle?: string
  outputTitle?: string
}
const TransformLayout = ({
  input,
  output,
  title,
  onTransform,
  onChangeInput,
  onChangeOutput,
  inputLang,
  outputLang,
  inputDesc,
  outputDesc,
  inputTitle,
  outputTitle
}: IProps) => {
  const [isColumn, setIsColumn] = useState(false)
  const [isRevert, setIsRevert] = useState(false)
  return (
    <div>
      <div className="flex justify-between overflow-x-hidden mb-8">
        <div className="flex gap-4">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={() => setIsRevert((pre) => !pre)}>
            {isRevert ? <ArrowLeftRight /> : <ArrowRightLeft />}
          </button>
        </div>

        <button onClick={() => setIsColumn((pre) => !pre)}>
          {isColumn ? <Columns2 /> : <Rows2 />}
        </button>
      </div>

      <div
        className={clsx(
          'gap-6 overflow-auto transform-content min-h-[80vh] flex',
          isColumn
            ? [isRevert ? 'flex-row-reverse' : 'flex-row']
            : [isRevert ? 'flex-col-reverse' : 'flex-col']
        )}
      >
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{inputTitle || 'Input'}</CardTitle>
            {!!inputDesc && <CardDescription className="break-all">{inputDesc}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Editor
              key={isColumn ? 1 : 2}
              value={input}
              language={inputLang}
              options={options}
              className={clsx('code-editor', isColumn ? 'min-h-96' : 'min-h-28')}
              onChange={onChangeInput}
            />
          </CardContent>
        </Card>
        <div className="flex justify-around mx-auto">
          <Button onClick={() => onTransform(isRevert)}>Transform</Button>
        </div>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{outputTitle || 'Output'}</CardTitle>
            {!!outputDesc && <CardDescription className="break-all">{outputDesc}</CardDescription>}
          </CardHeader>
          <CardContent>
            <Editor
              key={isColumn ? 3 : 4}
              value={output}
              language={outputLang}
              className={clsx('code-editor', isColumn ? 'min-h-96' : 'min-h-28')}
              options={options}
              onChange={onChangeOutput}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TransformLayout
