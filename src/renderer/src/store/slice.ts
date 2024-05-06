import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EXTENSION_KEY } from '@renderer/models/extensions'

export interface AppState {
  pinedExtensions: EXTENSION_KEY[]
  recentExtensions: EXTENSION_KEY[]
}

const initialState: AppState = {
  pinedExtensions: [],
  recentExtensions: []
}

export const syncStore = createAsyncThunk('app/syncStore', async () => {
  const pinedExtensions = await window.electron.store.get('pinedExtensions')
  return {
    pinedExtensions
  }
})

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    pinAction: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      const pinedExtension = state.pinedExtensions.includes(payload)
        ? state.pinedExtensions.filter((p) => p !== payload)
        : state.pinedExtensions.concat(payload)
      state.pinedExtensions = pinedExtension
      window.electron.store.set('pinedExtensions', pinedExtension)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(syncStore.fulfilled, (state, action) => {
      state.pinedExtensions = action.payload.pinedExtensions || []
    })
  }
})

export const { pinAction } = appSlice.actions

export default appSlice.reducer
