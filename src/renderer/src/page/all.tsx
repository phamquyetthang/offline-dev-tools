import GroupExtensions from '@renderer/components/components/group-extensions'
import { EXTENSIONS } from '@renderer/models/extensions'

const All = () => {
  const extensions = EXTENSIONS
  return (
    <div className="flex flex-col gap-4">
      <GroupExtensions title="Pined Extensions" extensions={extensions} />
      <GroupExtensions title="Recent Extensions" extensions={extensions} />
      <GroupExtensions title="All Extensions" extensions={extensions} />
    </div>
  )
}

export default All
