import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EXTENSION_KEY } from '@renderer/models/extensions'
import { uniq } from 'lodash-es'

export interface AppState {
  pinedExtensions: EXTENSION_KEY[]
  recentExtensions: EXTENSION_KEY[]
  activeExtensions: EXTENSION_KEY[]
  activePage?: EXTENSION_KEY
}

const initialState: AppState = {
  pinedExtensions: [],
  recentExtensions: [],
  activeExtensions: []
}

export const syncStore = createAsyncThunk('app/syncStore', async () => {
  const pinedExtensions = await window.electron.store.get('pinedExtensions')
  const recentExtensions = await window.electron.store.get('recentExtensions')
  const activeExtensions = await window.electron.store.get('activeExtensions')
  const activePage = await window.electron.store.get('activePage')
  return {
    pinedExtensions,
    recentExtensions,
    activeExtensions,
    activePage
  }
})

export const saveStore = (state: Partial<AppState>) => {
  Object.keys(state).forEach((key) => {
    window.electron.store.set(key, state[key])
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
        state.activeExtensions = uniq(state.activeExtensions.concat(payload))
        saveStore({
          recentExtensions: state.recentExtensions,
          activeExtensions: state.activeExtensions
        })
      }
      state.activePage = payload
      saveStore({ activePage: payload })
    },
    setActivePage: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      state.activePage = payload
      saveStore({ activePage: payload })
    },
    closeTag: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      state.activeExtensions = state.activeExtensions.filter((ex) => ex !== payload)
      if (state.activePage === payload) {
        state.activePage = state.activeExtensions.slice(-1)[0]
      }
      saveStore({ activePage: state.activePage, activeExtensions: state.activeExtensions })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      syncStore.fulfilled,
      (state, { payload: { activeExtensions, activePage, pinedExtensions, recentExtensions } }) => {
        state.pinedExtensions = pinedExtensions || []
        state.recentExtensions = recentExtensions || []
        state.activeExtensions = activeExtensions || []
        state.activePage = state.activeExtensions.includes(activePage) ? activePage : undefined
      }
    )
  }
})

export const { pinAction, setRecentExtensions, setActivePage, closeTag } = appSlice.actions

export default appSlice.reducer
