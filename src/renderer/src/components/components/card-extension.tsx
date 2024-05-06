import { Card, CardContent } from '@lib/components/ui/card'
import { Pin, PinOff, Wrench } from 'lucide-react'
import Icon from './icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { useAppDispatch, useAppSelector } from '@renderer/store'
import { pinAction } from '@renderer/store/slice'
import { EXTENSION_KEY } from '@renderer/models/extensions'
import { Link } from 'react-router-dom'

interface IProps {
  title: string
  icon?: keyof typeof dynamicIconImports
  alt?: string
  extensionKey: EXTENSION_KEY
  path?: string
}
const CardExtension = ({ icon, title, alt, extensionKey, path }: IProps) => {
  const dispatch = useAppDispatch()
  const pins = useAppSelector((state) => state.app.pinedExtensions)
  return (
    <Link to={path || ''}>
      <Card className="w-[220px] hover:shadow-xl cursor-pointer group relative">
        <CardContent className="flex gap-4 p-4 items-center">
          <div className="border shadow rounded w-10 h-10 leading-none font-bold flex items-center justify-center">
            {icon ? <Icon name={icon} /> : alt || <Wrench />}
          </div>
          <span className="font-semibold">{title}</span>
        </CardContent>
        <button
          onClick={() => dispatch(pinAction(extensionKey))}
          className=" hidden absolute top-1 right-2 group-hover:block"
        >
          {pins.includes(extensionKey) ? <PinOff className="w-4" /> : <Pin className="w-4" />}
        </button>
      </Card>
    </Link>
  )
}

export default CardExtension
