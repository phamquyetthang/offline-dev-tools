import { IExtension } from '@renderer/models/extensions'
import CardExtension from './card-extension'

interface IProps {
  title: string
  extensions: IExtension[]
}
const GroupExtensions = ({ title, extensions }: IProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {extensions.map((e) => (
          <CardExtension
            key={e.key}
            icon={e.icon}
            title={e.title}
            alt={e.alt}
            extensionKey={e.key}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupExtensions
