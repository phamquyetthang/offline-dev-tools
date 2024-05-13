import GroupExtensions from '@renderer/components/components/group-extensions'
import { CATEGORIES_KEY } from '@renderer/models/extensions.d'
import { CATEGORIES, EXTENSIONS } from '@renderer/models/extensions'

const Text = () => {
  const category = CATEGORIES.find((c) => c.path === CATEGORIES_KEY.text)
  const extensions = EXTENSIONS.filter((e) => e.category === CATEGORIES_KEY.text)

  return <GroupExtensions title={category?.title || ''} extensions={extensions} />
}

export default Text
