import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Checkbox } from '@lib/components/ui/checkbox'
import { Input } from '@lib/components/ui/input'
import { Textarea } from '@lib/components/ui/textarea'
import CopyButton from '@renderer/components/components/copy-button'
import { ArrowUpFromLine, Plus, Trash } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import Highlighter from 'react-highlight-words'

const initReplaceArg = {
  pattern: '',
  replacement: '',
  all: true
}
const TextReplacer = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string>('')
  const [replaceArgs, setReplaceArgs] = useState([{ ...initReplaceArg }])
  const [code, setCode] = useState('')

  const onChangeReplaceArgs = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setReplaceArgs((pre) =>
      pre.map((replaceArg, i) => {
        if (i === index) {
          return {
            ...replaceArg,
            [e.target.name]: e.target.value
          }
        }
        return replaceArg
      })
    )
  }

  const onReplaceAllChange = (index: number) => (checked: boolean) => {
    setReplaceArgs((pre) =>
      pre.map((replaceArg, i) => {
        if (i === index) {
          return {
            ...replaceArg,
            all: checked
          }
        }
        return replaceArg
      })
    )
  }

  const onRemoveArg = (index: number) => {
    setReplaceArgs((pre) => pre.filter((_, i) => i !== index))
  }

  const onReplace = () => {
    let v = input
    let c = `'${input}'`
    replaceArgs.forEach((replaceArg) => {
      const { all, pattern, replacement } = replaceArg
      if (all) {
        v = v.replaceAll(pattern, replacement)
        c += `.replaceAll('${pattern}', '${replacement}')`
      } else {
        v = v.replace(pattern, replacement)
        c += `.replace('${pattern}', '${replacement}')`
      }
    })
    setOutput(v)
    setCode(c)
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Text replacer</h3>
      <Card>
        <CardHeader>
          <CardTitle>Original Text</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste a String here!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="mt-4 flex flex-col gap-1">
            {replaceArgs.map((replaceArg, index) => (
              <div className="flex gap-2 items-center" key={index}>
                <Input
                  name="pattern"
                  placeholder="pattern"
                  className="max-w-48"
                  value={replaceArg.pattern}
                  onChange={onChangeReplaceArgs(index)}
                />
                <Input
                  placeholder="replacement"
                  name="replacement"
                  className="max-w-48"
                  value={replaceArg.replacement}
                  onChange={onChangeReplaceArgs(index)}
                />
                <div className="flex items-center space-x-2">
                  <Checkbox checked={replaceArg.all} onCheckedChange={onReplaceAllChange(index)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hidden sm:block"
                  >
                    replace all
                  </label>
                </div>
                {!!index && (
                  <button
                    className="p-2 bg-slate-200 rounded shadow"
                    onClick={() => onRemoveArg(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button
              onClick={() => setReplaceArgs((pre) => pre.concat({ ...initReplaceArg }))}
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onReplace} className="mr-2">
            Replace <ArrowUpFromLine className="rotate-180 h-4" />
          </Button>
          <CopyButton value={{ text: code }} disabled={!code} title="Copy JS code" />
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Output</CardTitle>
        </CardHeader>
        <CardContent>
          <Highlighter
            textToHighlight={output}
            searchWords={replaceArgs.map((r) => r.replacement)}
          />
        </CardContent>
        <CardFooter>
          <CopyButton value={{ text: output }} disabled={!output} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default TextReplacer
