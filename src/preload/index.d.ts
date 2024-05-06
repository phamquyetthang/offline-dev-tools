import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI & {
      store: {
        get: (key: string) => T
        set: (key: string, val: T) => void
      }
    }
    api: unknown
  }
}
