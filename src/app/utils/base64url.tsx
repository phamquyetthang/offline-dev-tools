import { Buffer } from 'buffer'

export const base64UrlEncode = (decoded: string) => {
  return Buffer.from(decoded)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const base64UrlDecode = (str: string) => {
  const paddedStr = str + '==='.slice(0, str.length % 4)
  const base64 = paddedStr.replace(/-/g, '+').replace(/_/g, '/')
  const decoded = Buffer.from(base64, 'base64').toString('utf-8')
  return decoded
}
