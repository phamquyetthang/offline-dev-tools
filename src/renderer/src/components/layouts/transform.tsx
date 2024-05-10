import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/ui/card'
import { ArrowLeftRight, ArrowRightLeft, Columns2, Rows2 } from 'lucide-react'
import Editor from '@monaco-editor/react'
import './transform.css'
import { memo, useState } from 'react'
import clsx from 'clsx'
import { useResizeDetector } from 'react-resize-detector'

const options = {
  lineNumbersMinChars: 2,
  lineDecorationsWidth: 0,
  minimap: {
    enabled: false
  }
}

interface EditorProps {
  value: string
  lang?: string
  elKey?: string
  readOnly?: boolean
  onChange: (v?: string) => void
}

const EditorContent = memo(
  function InputEditorWrapper({ value, lang, onChange, elKey, readOnly }: EditorProps) {
    const { height, ref } = useResizeDetector()

    return (
      <CardContent ref={ref} className="h-full flex-1 overflow-auto">
        <Editor
          key={elKey}
          value={value}
          language={lang}
          options={{ ...options, readOnly }}
          className={clsx('code-editor')}
          onChange={onChange}
          height={(height || 200) - 24}
        />
      </CardContent>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.lang === nextProps.lang &&
      prevProps.elKey === nextProps.elKey &&
      prevProps.readOnly === nextProps.readOnly
    )
  }
)

interface IInputProps {
  input: string
  inputLang?: string
  inputDesc?: string
  inputTitle?: string
  onChangeInput: (input?: string) => void
}

interface IOutputProps {
  output: string
  outputLang?: string
  outputDesc?: string
  outputTitle?: string
  onChangeOutput: (output?: string) => void
}

interface IProps {
  title: string
  onTransform: (isRevert?: boolean) => void
  inputProps: IInputProps
  outputProps: IOutputProps
  canRevert?: boolean
}

const TransformLayout = ({ title, onTransform, inputProps, outputProps, canRevert }: IProps) => {
  const { inputDesc, inputTitle, onChangeInput, input, inputLang } = inputProps
  const { outputDesc, outputTitle, onChangeOutput, output, outputLang } = outputProps
  const [isColumn, setIsColumn] = useState(true)
  const [isRevert, setIsRevert] = useState(false)

  const { width, ref } = useResizeDetector()

  const inputKey = `${width}x${isColumn}`
  const outputKey = `${width}x${isColumn}`

  return (
    <div className="max-h-screen" ref={ref}>
      <div className="flex justify-between overflow-x-hidden mb-8">
        <div className="flex gap-4">
          <h3 className="font-semibold">{title}</h3>
          {canRevert && (
            <Button size="icon" className="p-1 w-6 h-6" onClick={() => setIsRevert((pre) => !pre)}>
              {isRevert ? <ArrowLeftRight /> : <ArrowRightLeft />}
            </Button>
          )}
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
        <Card className="flex-1 flex flex-col items-stretch">
          <CardHeader>
            <CardTitle>{inputTitle || 'Input'}</CardTitle>
            {!!inputDesc && <CardDescription className="break-all">{inputDesc}</CardDescription>}
          </CardHeader>
          <EditorContent
            elKey={inputKey}
            onChange={onChangeInput}
            value={input}
            lang={inputLang}
            readOnly={isRevert}
          />
        </Card>
        <div className="flex justify-around mx-auto">
          <Button onClick={() => onTransform(isRevert)}>Transform</Button>
        </div>
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle>{outputTitle || 'Output'}</CardTitle>
            {!!outputDesc && <CardDescription className="break-all">{outputDesc}</CardDescription>}
          </CardHeader>
          <EditorContent
            elKey={outputKey}
            onChange={onChangeOutput}
            value={output}
            lang={outputLang}
            readOnly={!isRevert}
          />
        </Card>
      </div>
    </div>
  )
}

export default TransformLayout
