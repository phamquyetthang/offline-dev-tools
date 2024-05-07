import { Button } from '@lib/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@lib/components/ui/card'
import { Textarea } from '@lib/components/ui/textarea'
import CopyButton from '@renderer/components/components/copy-button'
import { Download, ImageUp } from 'lucide-react'
import { ChangeEvent, useState } from 'react'

const Base64Image = () => {
  const [image, setImage] = useState<ArrayBuffer | string | null>(null)

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0)

    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        setImage(reader.result)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  }

  const onDownload = () => {
    const a = document.createElement('a')
    a.href = image?.toString() || ''
    a.download = 'Image.png'
    a.click()
  }

  return (
    <div>
      <h3 className="font-semibold mb-4">Base 64 image</h3>

      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-[2fr_1fr] items-start">
        <Card>
          <CardHeader>
            <CardTitle>Encoded</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste a text here!"
              value={image?.toString()}
              onChange={(e) => setImage(e.target.value)}
              className="min-h-32"
            />
          </CardContent>
          <CardFooter>
            <div className="flex gap-2">
              <CopyButton value={{ text: image?.toString() }} disabled={!image} />
            </div>
          </CardFooter>
        </Card>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageUp className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">svg, png, jpg, webp or GIF</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={onUpload} />
          </label>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Origin Image</CardTitle>
        </CardHeader>
        <CardContent>{image && <img className="max-h-96" src={image.toString()} />}</CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button disabled={!image} onClick={onDownload}>
              Download <Download className="h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Base64Image
