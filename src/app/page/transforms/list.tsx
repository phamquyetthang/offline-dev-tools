import GroupExtensions from '@app/components/components/group-extensions'
import { CATEGORIES_KEY } from '@app/models/types'
import { CATEGORIES, EXTENSIONS } from '@app/models/extensions'

const Transforms = () => {
  const category = CATEGORIES.find((c) => c.path === CATEGORIES_KEY.transform)
  const extensions = EXTENSIONS.filter((e) => e.category === CATEGORIES_KEY.transform)

  return <GroupExtensions title={category?.title || ''} extensions={extensions} />
}

export default Transforms
