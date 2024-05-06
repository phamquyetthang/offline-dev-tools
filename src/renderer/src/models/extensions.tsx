import All from '@renderer/page/all'
import Base64Text from '@renderer/page/base64-text'
import EncoderDecoder from '@renderer/page/encoder-decoder'
import Generators from '@renderer/page/generators'
import JwtDecoder from '@renderer/page/jwt-decoder'
import Text from '@renderer/page/text'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { ReactNode } from 'react'

export interface ICategory {
  path: CATEGORIES_KEY
  title: string
  icon: keyof typeof dynamicIconImports
  page: ReactNode
}

export enum CATEGORIES_KEY {
  all = '',
  text = 'text',
  encode_decode = 'encode_decode',
  generators = 'generators'
}

export enum EXTENSION_KEY {
  text_formatter = 'text_formatter',
  text_replacer = 'text_replacer',
  jwt_decode = 'jwt_decode',
  generators = 'generators',
  base64_text = 'base64_text',
  base64_image = 'base64_image'
}

export interface IExtension {
  category: string
  path: string
  title: string
  key: EXTENSION_KEY
  icon?: keyof typeof dynamicIconImports
  page: ReactNode
  alt?: string
}
export const CATEGORIES: ICategory[] = [
  {
    path: CATEGORIES_KEY.all,
    title: 'All extensions',
    icon: 'home',
    page: <All />
  },
  {
    path: CATEGORIES_KEY.text,
    title: 'Text extensions',
    icon: 'remove-formatting',
    page: <Text />
  },
  {
    path: CATEGORIES_KEY.encode_decode,
    title: 'Encoder/ Decoder',
    icon: 'key-round',
    page: <EncoderDecoder />
  },
  {
    path: CATEGORIES_KEY.generators,
    title: 'Generators Sample',
    icon: 'package',
    page: <Generators />
  }
]

export const EXTENSIONS: IExtension[] = [
  {
    category: CATEGORIES_KEY.text,
    path: 'text-formatter',
    title: 'Text Formatter',
    icon: 'case-sensitive',
    key: EXTENSION_KEY.text_formatter,
    page: <JwtDecoder />
  },
  {
    category: CATEGORIES_KEY.text,
    path: 'text-replacer',
    title: 'Text Replacer',
    icon: 'remove-formatting',
    key: EXTENSION_KEY.text_replacer,
    page: <JwtDecoder />
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: 'jwt-decode',
    title: 'JWT Decoder',
    icon: 'asterisk',
    key: EXTENSION_KEY.jwt_decode,
    page: <JwtDecoder />
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: 'base64-text',
    title: 'Base64 Text',
    alt: '64',
    key: EXTENSION_KEY.base64_text,
    page: <Base64Text />
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: 'base64-image',
    title: 'Base64 Image',
    alt: '64',
    key: EXTENSION_KEY.base64_image,
    page: <JwtDecoder />
  }
]
