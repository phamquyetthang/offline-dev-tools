import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Textarea } from '@lib/components/ui/textarea'
import { ArrowUpFromLine } from 'lucide-react'
import { useState } from 'react'

const Base64Text = () => {
  const [encode, setEncode] = useState('')
  const [decoded, setDecoded] = useState<string>('')

  return (
    <div>
      <h3 className="font-semibold mb-4">Base 64 text</h3>
      <Card>
        <CardHeader>
          <CardTitle>Origin text</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={decoded}
            placeholder="Paste a text here!"
            onChange={(e) => setDecoded(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={() => setEncode(btoa(decoded))} disabled={!decoded}>
            Encode <ArrowUpFromLine className="rotate-180 h-4" />
          </Button>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Encoded</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste a text here!"
            value={encode}
            onChange={(e) => setEncode(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button onClick={() => setDecoded(atob(encode))} disabled={!encode}>
            Decode <ArrowUpFromLine className="h-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Base64Text
