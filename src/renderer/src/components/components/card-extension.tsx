import { Card, CardContent } from '@lib/components/ui/card'
import { Pin, PinOff, Wrench } from 'lucide-react'
import Icon from './icon'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface IProps {
  pined?: boolean
  title: string
  icon?: keyof typeof dynamicIconImports
  alt?: string
}
const CardExtension = ({ pined, icon, title, alt }: IProps) => {
  return (
    <Card className="w-[220px] hover:shadow-xl cursor-pointer group relative">
      <CardContent className="flex gap-4 p-4 items-center">
        <div className="border shadow rounded w-10 h-10 leading-none font-bold flex items-center justify-center">
          {icon ? <Icon name={icon} /> : alt || <Wrench />}
        </div>
        <span className="font-semibold">{title}</span>
      </CardContent>
      <div className=" hidden absolute top-1 right-2 group-hover:block">
        {pined ? <PinOff className="w-4" /> : <Pin className="w-4" />}
      </div>
    </Card>
  )
}

export default CardExtension
