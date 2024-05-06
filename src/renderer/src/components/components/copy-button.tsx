import { Button } from '@lib/components/ui/button'
import { Data } from 'electron'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
interface IProps {
  value: Data & { img?: string }
}
const CopyButton = ({ value }: IProps) => {
  return (
    <Button
      onClick={() => {
        window.electron.ipcRenderer.send('clipboard', value)
        toast('Copied to clipboard!')
      }}
    >
      Copy <Copy className="w-5 h-5 ml-2" />
    </Button>
  )
}

export default CopyButton
