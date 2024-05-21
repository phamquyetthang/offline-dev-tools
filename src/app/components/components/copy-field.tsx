import { truncate } from 'lodash-es'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface CopyFieldProps {
  value: string
}
const CopyField = ({ value }: CopyFieldProps) => {
  return (
    <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm mb-2 flex justify-between gap-2">
      <p>{value}</p>

      <div className="w-5 h-5">
        <Copy
          className="w-5 h-5 cursor-pointer"
          onClick={() => {
            window.electron.ipcRenderer.send('clipboard', { text: value })
            toast(`Copied to clipboard <"${truncate(value, { length: 50 })}">`)
          }}
        />
      </div>
    </div>
  )
}

export default CopyField
