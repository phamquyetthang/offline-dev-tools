import Generator from '@renderer/components/layouts/generator'
import { EXTENSION_KEY } from '@renderer/models/extensions.d'
import { faker } from '@faker-js/faker'

const UuidGenerator = () => {
  return <Generator extensionKey={EXTENSION_KEY.uuid} generateFunc={faker.string.uuid} />
}

export default UuidGenerator
