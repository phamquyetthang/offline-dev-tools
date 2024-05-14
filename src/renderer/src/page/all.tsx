import GroupExtensions from '@renderer/components/components/group-extensions'
import { EXTENSIONS } from '@renderer/models/extensions'
import { useAppSelector } from '@renderer/store'
import { pinedExtensionsSelector, recentExtensionsSelector } from '@renderer/store/selector'
import { memo } from 'react'

const AllExtension = memo(function AllExtensionComponent() {
  return <GroupExtensions title="All Extensions" extensions={EXTENSIONS} />
})

const PinedExtension = memo(function PinedExtensionComponent() {
  const pinedExtensions = useAppSelector(pinedExtensionsSelector)

  return (
    !!pinedExtensions.length && (
      <GroupExtensions title="Pined Extensions" extensions={pinedExtensions} />
    )
  )
})

const RecentExtension = memo(function RecentExtensionComponent() {
  const recentExtensions = useAppSelector(recentExtensionsSelector)

  return (
    !!recentExtensions.length && (
      <GroupExtensions title="Recent Extensions" extensions={recentExtensions} />
    )
  )
})

const All = () => {
  return (
    <div className="flex flex-col gap-4">
      <PinedExtension />
      <RecentExtension />
      <AllExtension />
    </div>
  )
}

export default memo(All)
