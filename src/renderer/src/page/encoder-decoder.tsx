import GroupExtensions from '@renderer/components/components/group-extensions'
import { CATEGORIES, CATEGORIES_KEY, EXTENSIONS } from '@renderer/models/extensions'

const EncoderDecoder = () => {
  const category = CATEGORIES.find((c) => c.path === CATEGORIES_KEY.encode_decode)
  const extensions = EXTENSIONS.filter((e) => e.category === CATEGORIES_KEY.encode_decode)

  return <GroupExtensions title={category?.title || ''} extensions={extensions} />
}

export default EncoderDecoder
