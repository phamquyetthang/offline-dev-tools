import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Textarea } from '@lib/components/ui/textarea'
import ReactJson from '@microlink/react-json-view'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { ArrowUpFromLine } from 'lucide-react'
import { useState } from 'react'

const JwtDecoder = () => {
  const [encode, setEncode] = useState('')
  const [decoded, setDecoded] = useState<JwtPayload | string>({})
  const [header, setHeader] = useState<JwtPayload>({})
  const onDecode = () => {
    setDecoded(jwtDecode(encode))
    setHeader(jwtDecode(encode, { header: true }))
  }
  return (
    <div>
      <h3 className="font-semibold mb-4">JSON Web Token</h3>
      <Card>
        <CardHeader>
          <CardTitle>Encoded</CardTitle>
          <CardDescription className="break-all">
            JWT, example:{' '}
            <i>
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U
            </i>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Paste a JSON Web Token here!"
            value={encode}
            onChange={(e) => setEncode(e.target.value)}
          />
        </CardContent>
      </Card>
      <div className="flex justify-around m-6 mx-auto">
        <Button onClick={onDecode}>
          Decode <ArrowUpFromLine className="rotate-180 h-4" />
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Decoded</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-semibold text-sm">Header</p>
          <ReactJson src={header} displayDataTypes={false} />

          <p className="font-semibold mt-6 text-sm">Payload</p>
          {typeof decoded === 'string' ? (
            <Textarea value={decoded} />
          ) : (
            <ReactJson src={decoded} displayDataTypes={false} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default JwtDecoder
