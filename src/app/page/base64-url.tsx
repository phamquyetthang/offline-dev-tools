import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Textarea } from '@lib/components/ui/textarea'
import { ArrowUpFromLine } from 'lucide-react'
import { useState } from 'react'
import CopyButton from '@app/components/components/copy-button'
import { base64UrlDecode, base64UrlEncode } from '@app/utils/base64url'

const Base64Url = () => {
  const [encode, setEncode] = useState('')
  const [decoded, setDecoded] = useState<string>('')

  return (
    <div>
      <h3 className="font-semibold mb-4">Base 64 url</h3>
      <Card>
        <CardHeader>
          <CardTitle>Encode</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={decoded}
            placeholder="Paste a text here!"
            onChange={(e) => setDecoded(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => setEncode(base64UrlEncode(decoded))}
            disabled={!decoded}
            className="mr-2"
          >
            Encode <ArrowUpFromLine className="rotate-180 h-4" />
          </Button>
          <CopyButton value={{ text: decoded }} disabled={!decoded} />
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
          <Button
            onClick={() => setDecoded(base64UrlDecode(encode))}
            disabled={!encode}
            className="mr-2"
          >
            Decode <ArrowUpFromLine className="h-4" />
          </Button>
          <CopyButton value={{ text: encode }} disabled={!encode} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default Base64Url
