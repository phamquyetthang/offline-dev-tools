import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '.'
import { EXTENSION_KEY, IExtension } from '@app/models/types'
import { EXTENSIONS } from '@app/models/extensions'

const getExtensions = (extensions: EXTENSION_KEY[]): IExtension[] =>
  (extensions || []).reduce((pre: IExtension[] = [], cur) => {
    const extension = EXTENSIONS.find((ex) => ex.key === cur)
    if (extension) {
      pre.push(extension)
    }

    return pre
  }, [])

export const pinedExtensionsSelector = createSelector(
  (state: RootState) => state.app.pinedExtensions,
  getExtensions
)

export const recentExtensionsSelector = createSelector(
  (state: RootState) => state.app.recentExtensions,
  getExtensions
)

export const activeExtensionsSelector = createSelector(
  (state: RootState) => state.app.activeExtensions,
  getExtensions
)

export const extensionsInSecondSelector = createSelector(
  (state: RootState) => state.app.extensionsInSecond,
  getExtensions
)
