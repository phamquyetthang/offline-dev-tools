import Generator from '@renderer/components/layouts/generator'
import { EXTENSION_KEY } from '@renderer/models/extensions.d'
import { faker } from '@faker-js/faker'

const ObjectIdGenerator = () => {
  return (
    <Generator
      extensionKey={EXTENSION_KEY.object_id}
      generateFunc={faker.database.mongodbObjectId}
    />
  )
}

export default ObjectIdGenerator
