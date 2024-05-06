import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '.'
import { EXTENSIONS, IExtension } from '@renderer/models/extensions'

export const pinedExtensionsSelector = createSelector(
  (state: RootState) => state.app.pinedExtensions,
  (pinedExtensions) =>
    (pinedExtensions || []).reduce((pre: IExtension[] = [], cur) => {
      const extension = EXTENSIONS.find((ex) => ex.key === cur)
      if (extension) {
        pre.push(extension)
      }

      return pre
    }, [])
)
