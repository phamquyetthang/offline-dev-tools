import GroupExtensions from '@renderer/components/components/group-extensions'
import { CATEGORIES, CATEGORIES_NAME, EXTENSIONS } from '@renderer/models/extensions'

const EncoderDecoder = () => {
  const category = CATEGORIES.find((c) => c.path === CATEGORIES_NAME.encode_decode)
  const extensions = EXTENSIONS.filter((e) => e.category === CATEGORIES_NAME.encode_decode)

  return <GroupExtensions title={category?.title || ''} extensions={extensions} />
}

export default EncoderDecoder
