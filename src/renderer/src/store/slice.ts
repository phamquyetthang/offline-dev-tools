import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EXTENSION_KEY } from '@renderer/models/extensions'
import { uniq } from 'lodash-es'

export interface AppState {
  pinedExtensions: EXTENSION_KEY[]
  recentExtensions: EXTENSION_KEY[]
  activeExtensions: EXTENSION_KEY[]
  extensionsInSecond: EXTENSION_KEY[]
  activeInSecond?: EXTENSION_KEY | 'dashboard'
  activePage?: EXTENSION_KEY | 'dashboard'
}

const initialState: AppState = {
  pinedExtensions: [],
  recentExtensions: [],
  extensionsInSecond: [],
  activeExtensions: [],
  activeInSecond: undefined,
  activePage: 'dashboard'
}

export const saveStore = (state: Partial<AppState>) => {
  try {
    Object.keys(state).forEach((key) => {
      if (!state[key]) {
        window.electron.store.set(key, 'deleted')
      } else {
        window.electron.store.set(key, state[key])
      }
    })
  } catch (error) {
    console.log('🚀 ~ saveStore ~ error:', error)
  }
}

export const removeFromArr = <T>(arr: T[], value: T): { newArr: T[]; preValue: T } => {
  let preValue = value
  const newArr = arr.reduce((pre: T[] = [], cur) => {
    if (cur !== value) {
      pre.push(cur)
    } else {
      preValue = preValue === value ? pre.slice(-1)[0] : value
    }

    return pre
  }, [])
  return {
    newArr,
    preValue
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    pinAction: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      const pinedExtensions = state.pinedExtensions.includes(payload)
        ? state.pinedExtensions.filter((p) => p !== payload)
        : state.pinedExtensions.concat(payload)
      state.pinedExtensions = pinedExtensions
      saveStore({ pinedExtensions })
    },
    setRecentExtensions: (state, { payload }: PayloadAction<EXTENSION_KEY | undefined>) => {
      if (payload) {
        state.recentExtensions = uniq(state.recentExtensions.concat(payload).reverse()).slice(0, 5)
        if (
          !state.extensionsInSecond.includes(payload) &&
          !state.extensionsInSecond.includes(payload)
        ) {
          state.activeExtensions = uniq(state.activeExtensions.concat(payload))
        }
        saveStore({
          recentExtensions: state.recentExtensions,
          activeExtensions: state.activeExtensions
        })
      }
      if (payload && state.extensionsInSecond.includes(payload)) {
        state.activeInSecond = payload
        saveStore({ activeInSecond: payload })
      } else {
        try {
          state.activePage = payload || 'dashboard'
          saveStore({ activePage: state.activePage })
        } catch (e) {
          console.log('🚀 ~ e:', e)
        }
      }
    },
    setActivePage: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.extensionsInSecond.includes(payload)) {
        state.activeInSecond = payload
        saveStore({ activeInSecond: payload })
      } else {
        state.activePage = payload
        saveStore({ activePage: payload })
      }
    },
    closeTag: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.activeExtensions.includes(payload)) {
        const { newArr, preValue } = removeFromArr<EXTENSION_KEY>(state.activeExtensions, payload)
        state.activeExtensions = newArr
        state.activePage = preValue
        saveStore({ activePage: state.activePage, activeExtensions: newArr })
      } else {
        const { newArr, preValue } = removeFromArr<EXTENSION_KEY>(state.extensionsInSecond, payload)
        state.extensionsInSecond = newArr
        state.activeInSecond = preValue

        saveStore({
          activeInSecond: preValue,
          extensionsInSecond: newArr
        })
      }
    },
    moveToSecondTab: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      const { activeExtensions, extensionsInSecond } = state
      const { newArr, preValue } = removeFromArr<EXTENSION_KEY>(activeExtensions, payload)
      state.activeExtensions = newArr
      state.activePage = preValue
      state.extensionsInSecond = uniq(extensionsInSecond.concat(payload))
      state.activeInSecond = payload
      saveStore({
        activeExtensions: newArr,
        activePage: preValue,
        extensionsInSecond: state.extensionsInSecond,
        activeInSecond: payload
      })
    },
    syncStore: (state) => {
      Object.keys(state).forEach((key) => {
        const value = window.electron.store.get(key)
        if (value && value !== 'deleted') {
          state[key] = window.electron.store.get(key)
        }
      })
    }
  }
})

export const {
  pinAction,
  setRecentExtensions,
  setActivePage,
  closeTag,
  moveToSecondTab,
  syncStore
} = appSlice.actions

export default appSlice.reducer
