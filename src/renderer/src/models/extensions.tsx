import All from '@renderer/page/all'
import EncoderDecoder from '@renderer/page/encoder-decoder'
import Generators from '@renderer/page/generators'
import Text from '@renderer/page/text'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { ReactNode } from 'react'

export interface ICategory {
  path: CATEGORIES_NAME
  title: string
  icon: keyof typeof dynamicIconImports
  page: ReactNode
}

export enum CATEGORIES_NAME {
  all = '',
  text = 'text',
  encode_decode = 'encode_decode',
  generators = 'generators'
}

export interface IExtension {
  category: string
  path: string
  title: string
  icon?: keyof typeof dynamicIconImports
  page?: ReactNode
  alt?: string
}
export const CATEGORIES: ICategory[] = [
  {
    path: CATEGORIES_NAME.all,
    title: 'All extensions',
    icon: 'home',
    page: <All />
  },
  {
    path: CATEGORIES_NAME.text,
    title: 'Text extensions',
    icon: 'remove-formatting',
    page: <Text />
  },
  {
    path: CATEGORIES_NAME.encode_decode,
    title: 'Encoder/ Decoder',
    icon: 'key-round',
    page: <EncoderDecoder />
  },
  {
    path: CATEGORIES_NAME.generators,
    title: 'Generators Sample',
    icon: 'package',
    page: <Generators />
  }
]

export const EXTENSIONS: IExtension[] = [
  {
    category: CATEGORIES_NAME.text,
    path: 'text-formatter',
    title: 'Text Formatter',
    icon: 'case-sensitive'
  },
  {
    category: CATEGORIES_NAME.text,
    path: 'text-replacer',
    title: 'Text Replacer',
    icon: 'remove-formatting'
  },
  {
    category: CATEGORIES_NAME.encode_decode,
    path: 'jwt-decode',
    title: 'JWT Decoder',
    icon: 'asterisk'
  },
  {
    category: CATEGORIES_NAME.encode_decode,
    path: 'base64-text',
    title: 'Base64 Text',
    alt: '64'
  },
  {
    category: CATEGORIES_NAME.encode_decode,
    path: 'base64-image',
    title: 'Base64 Image',
    alt: '64'
  }
]
