import { Card, CardContent } from '@lib/components/ui/card'
import { Pin, PinOff, Wrench } from 'lucide-react'
import Icon from './icon'
import { useAppDispatch, useAppSelector } from '@renderer/store'
import { pinAction, setRecentExtensions } from '@renderer/store/slice'
import { EXTENSION_KEY, IExtension } from '@renderer/models/types'

interface IProps extends Omit<IExtension, 'category' | 'page'> {
  extensionKey: EXTENSION_KEY
}

const PinButton = ({ extensionKey }: { extensionKey: EXTENSION_KEY }) => {
  const dispatch = useAppDispatch()
  const pins = useAppSelector((state) => state.app.pinedExtensions)
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        dispatch(pinAction(extensionKey))
      }}
      className="p-2 hidden absolute top-0 right-0 group-hover:block hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
    >
      {pins.includes(extensionKey) ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
    </button>
  )
}

const CardExtension = ({ icon, title, alt, extensionKey, iconNode }: IProps) => {
  const dispatch = useAppDispatch()
  return (
    <Card
      className="w-[220px] hover:shadow-xl cursor-pointer group relative"
      onClick={() => dispatch(setRecentExtensions(extensionKey))}
    >
      <CardContent className="flex gap-4 p-4 items-center">
        <div className="border shadow rounded w-10 h-10 leading-none font-bold flex items-center justify-center">
          {iconNode || (icon ? <Icon name={icon} /> : alt || <Wrench />)}
        </div>
        <span className="font-semibold">{title}</span>
      </CardContent>
      <PinButton extensionKey={extensionKey} />
    </Card>
  )
}

export default CardExtension
