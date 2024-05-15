import Generator from '@app/components/layouts/generator'
import { EXTENSION_KEY } from '@app/models/types'
import { faker } from '@faker-js/faker'

const UuidGenerator = () => {
  return <Generator extensionKey={EXTENSION_KEY.uuid} generateFunc={faker.string.uuid} />
}

export default UuidGenerator
