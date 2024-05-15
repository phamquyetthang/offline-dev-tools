import Generator from '@app/components/layouts/generator'
import { EXTENSION_KEY } from '@app/models/types'
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
