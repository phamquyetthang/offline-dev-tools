import GroupExtensions from '@renderer/components/components/group-extensions'
import { EXTENSIONS } from '@renderer/models/extensions'
import { useAppSelector } from '@renderer/store'
import { pinedExtensionsSelector, recentExtensionsSelector } from '@renderer/store/selector'

const All = () => {
  const extensions = EXTENSIONS
  const pinedExtensions = useAppSelector(pinedExtensionsSelector)
  const recentExtensions = useAppSelector(recentExtensionsSelector)
  return (
    <div className="flex flex-col gap-4">
      {!!pinedExtensions.length && (
        <GroupExtensions title="Pined Extensions" extensions={pinedExtensions} />
      )}
      {!!recentExtensions.length && (
        <GroupExtensions title="Recent Extensions" extensions={recentExtensions} />
      )}
      <GroupExtensions title="All Extensions" extensions={extensions} />
    </div>
  )
}

export default All
