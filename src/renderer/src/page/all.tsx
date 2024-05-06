import GroupExtensions from '@renderer/components/components/group-extensions'
import { EXTENSIONS } from '@renderer/models/extensions'
import { useAppSelector } from '@renderer/store'
import { pinedExtensionsSelector } from '@renderer/store/selector'

const All = () => {
  const extensions = EXTENSIONS
  const pinedExtensions = useAppSelector(pinedExtensionsSelector)
  return (
    <div className="flex flex-col gap-4">
      <GroupExtensions title="Pined Extensions" extensions={pinedExtensions} />
      <GroupExtensions title="Recent Extensions" extensions={extensions} />
      <GroupExtensions title="All Extensions" extensions={extensions} />
    </div>
  )
}

export default All
