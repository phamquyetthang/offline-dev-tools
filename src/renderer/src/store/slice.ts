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
  activePage: undefined
}

export const saveStore = (state: Partial<AppState>) => {
  Object.keys(state).forEach((key) => {
    if (!state[key]) {
      window.electron.store.delete(key)
    } else {
      window.electron.store.set(key, state[key])
    }
  })
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
        state.activePage = payload
        saveStore({ activePage: payload })
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
      state.activeExtensions = state.activeExtensions.filter((ex) => ex !== payload)
      if (state.activePage === payload) {
        state.activePage = state.activeExtensions.slice(-1)[0]
      }
      saveStore({ activePage: state.activePage, activeExtensions: state.activeExtensions })
    },
    moveToSecondTab: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      state.activeExtensions = state.activeExtensions.reduce((pre: EXTENSION_KEY[] = [], cur) => {
        if (cur !== payload) {
          pre.push(cur)
        } else {
          state.activePage = state.activePage === payload ? pre.slice(-1)[0] : payload
        }

        return pre
      }, [])
      state.extensionsInSecond = uniq(state.extensionsInSecond.concat(payload))
      state.activeInSecond = payload
      saveStore({
        activeExtensions: state.activeExtensions,
        extensionsInSecond: state.extensionsInSecond,
        activeInSecond: payload
      })
    },
    syncStore: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = window.electron.store.get(key)
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
