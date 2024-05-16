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
  generators = 'generators',
  transform = 'transform'
}

export enum EXTENSION_KEY {
  text_formatter = 'text_formatter',
  text_replacer = 'text_replacer',
  jwt_decode = 'jwt_decode',
  generators = 'generators',
  base64_text = 'base64_text',
  base64_image = 'base64_image',
  html_jsx = 'html_jsx',
  svg_jsx = 'svg_jsx',
  base64_url = 'base64_url',
  uuid = 'uuid',
  object_id = 'object_id',
  lorem_text = 'lorem_text',
}

export interface IExtension {
  category: string
  path: string
  title: string
  key: EXTENSION_KEY
  icon?: keyof typeof dynamicIconImports
  page: ReactNode
  alt?: string
  keywords?: string[]
  iconNode?: ReactNode
}
