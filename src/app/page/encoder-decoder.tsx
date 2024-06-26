import GroupExtensions from '@app/components/components/group-extensions'
import { CATEGORIES, EXTENSIONS } from '@app/models/extensions'
import { CATEGORIES_KEY } from '@app/models/types'

const EncoderDecoder = () => {
  const category = CATEGORIES.find((c) => c.path === CATEGORIES_KEY.encode_decode)
  const extensions = EXTENSIONS.filter((e) => e.category === CATEGORIES_KEY.encode_decode)

  return <GroupExtensions title={category?.title || ''} extensions={extensions} />
}

export default EncoderDecoder
