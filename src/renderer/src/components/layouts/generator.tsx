import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Input } from '@lib/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@lib/components/ui/select'
import { EXTENSIONS_GENERATORS } from '@renderer/models/extensions'
import { IExtension } from '@renderer/models/extensions.d'
import { useMemo, useState } from 'react'
import CopyButton from '../components/copy-button'
import CopyField from '../components/copy-field'
import { useAppDispatch } from '@renderer/store'
import { setRecentExtensions } from '@renderer/store/slice'

interface GeneratorProps {
  extensionKey: string
  generateFunc: () => string
}
const Generator = ({ extensionKey, generateFunc }: GeneratorProps) => {
  const dispatch = useAppDispatch()

  const extension = useMemo(
    () => EXTENSIONS_GENERATORS.find((e) => e.key === extensionKey) as IExtension,
    [extensionKey]
  )
  const { title } = extension

  const [times, setTimes] = useState(5)
  const [outputs, setOutputs] = useState<string[]>([])

  const onGenerate = () => {
    const res: string[] = []
    for (let i = 0; i < times; i++) {
      res.push(generateFunc())
    }
    setOutputs(res)
  }
  return (
    <div>
      <h3 className="font-semibold  mb-4">{title}</h3>
      <Card>
        <CardHeader>
          <CardTitle>Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={extensionKey}
            onValueChange={(value) => {
              dispatch(setRecentExtensions(value))
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {EXTENSIONS_GENERATORS.map((e) => (
                <SelectItem value={e.key} key={e.key}>
                  {e.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 items-center">
            <Button onClick={onGenerate}>Generate</Button>
            <Input
              className="w-14"
              placeholder="Number of items"
              value={times}
              type="number"
              onChange={(e) => setTimes(Number(e.target.value))}
            />
            <span>items</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Outputs</CardTitle>
        </CardHeader>
        <CardContent>
          {outputs.map((output, index) => (
            <CopyField key={index} value={output} />
          ))}
        </CardContent>
        <CardFooter>
          <CopyButton value={{ text: outputs?.join('\n') }} disabled={!outputs.length} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default Generator
