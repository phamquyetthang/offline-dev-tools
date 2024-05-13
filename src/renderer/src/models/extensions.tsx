import { lazy } from 'react'
import { CATEGORIES_KEY, EXTENSION_KEY, ICategory, IExtension } from '@renderer/models/extensions.d'
import { SiMongodb } from 'react-icons/si'

import All from '@renderer/page/all'
import EncoderDecoder from '@renderer/page/encoder-decoder'
import Generators from '@renderer/page/generators'
import Text from '@renderer/page/text'

const JwtDecoder = lazy(() => import('@renderer/page/jwt-decoder'))
const Base64Image = lazy(() => import('@renderer/page/base64-image'))
const Base64Text = lazy(() => import('@renderer/page/base64-text'))
const TextReplacer = lazy(() => import('@renderer/page/text-replacer'))
const HTML_JSX = lazy(() => import('@renderer/page/html-jsx'))
const Base64URL = lazy(() => import('@renderer/page/base64-url'))
const UuidGenerator = lazy(() => import('@renderer/page/uuid-generator'))

export const CATEGORIES: ICategory[] = [
  {
    path: CATEGORIES_KEY.all,
    title: 'All extensions',
    icon: 'home',
    page: <All />
  },
  {
    path: CATEGORIES_KEY.transform,
    title: 'Transform tools',
    icon: 'arrow-right-left',
    page: <Generators />
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

export const EXTENSIONS_TEXT: IExtension[] = [
  {
    category: CATEGORIES_KEY.text,
    path: 'text-formatter',
    title: 'Text Formatter',
    icon: 'case-sensitive',
    key: EXTENSION_KEY.text_formatter,
    page: <JwtDecoder />,
    keywords: ['formatter', 'text', 'uppercase', 'lowercase']
  },
  {
    category: CATEGORIES_KEY.text,
    path: 'text-replacer',
    title: 'Text Replacer',
    icon: 'remove-formatting',
    key: EXTENSION_KEY.text_replacer,
    page: <TextReplacer />
  }
]

export const EXTENSIONS_GENERATORS: IExtension[] = [
  {
    category: CATEGORIES_KEY.generators,
    path: 'uuid',
    title: 'UUID Generator',
    key: EXTENSION_KEY.uuid,
    icon: 'key-square',
    page: <UuidGenerator />,
    keywords: ['UUID Generator', 'id']
  },
  {
    category: CATEGORIES_KEY.generators,
    path: 'object_id',
    title: 'Mongo ObjectId',
    key: EXTENSION_KEY.object_id,
    iconNode: <SiMongodb />,
    page: <HTML_JSX />,
    keywords: ['Mongo ObjectID Generator', 'id']
  }
]

export const EXTENSIONS_TRANSFORM: IExtension[] = [
  {
    category: CATEGORIES_KEY.transform,
    path: 'html-jsx',
    title: 'HTML ⇌ JSX',
    alt: '{/>',
    key: EXTENSION_KEY.html_jsx,
    page: <HTML_JSX />,
    keywords: ['html to jsx', 'jsx to html', 'html to react']
  }
]

export const EXTENSIONS_ENCODE_DECODE: IExtension[] = [
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
    icon: 'image',
    key: EXTENSION_KEY.base64_image,
    page: <Base64Image />
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: 'base64-url',
    title: 'Base64 URL',
    icon: 'link',
    key: EXTENSION_KEY.base64_url,
    page: <Base64URL />
  }
]

export const EXTENSIONS: IExtension[] = [
  ...EXTENSIONS_TEXT,
  ...EXTENSIONS_GENERATORS,
  ...EXTENSIONS_TRANSFORM,
  ...EXTENSIONS_ENCODE_DECODE
]
