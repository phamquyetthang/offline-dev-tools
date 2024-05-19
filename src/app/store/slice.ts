import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { EXTENSION_KEY } from "@app/models/types";
import { uniq } from "lodash-es";

export interface AppState {
  pinedExtensions: EXTENSION_KEY[];
  recentExtensions: EXTENSION_KEY[];
  activeExtensions: EXTENSION_KEY[];
  extensionsInSecond: EXTENSION_KEY[];
  activeInSecond?: EXTENSION_KEY | "dashboard";
  activePage?: EXTENSION_KEY | "dashboard";
}

const initialState: AppState = {
  pinedExtensions: [],
  recentExtensions: [],
  extensionsInSecond: [],
  activeExtensions: [],
  activeInSecond: undefined,
  activePage: "dashboard",
};

export const saveStore = (state: Partial<AppState>) => {
  try {
    Object.keys(state).forEach((key: keyof Partial<AppState>) => {
      if (!state[key]) {
        window.electron.store.set(key, "deleted");
      } else {
        window.electron.store.set(key, state[key]);
      }
    });
  } catch (error) {
    console.log("🚀 ~ saveStore ~ error:", error);
  }
};

export const removeFromArr = <T>(
  arr: T[],
  value: T
): { newArr: T[]; nextValue: T } => {
  let nextValue = value;
  const newArr = arr.reduce((pre: T[] = [], cur, index, a) => {
    if (cur !== value) {
      pre.push(cur);
    } else {
      if (nextValue === value) {
        nextValue = pre.slice(-1)[0] || a[index + 1];
      }
    }

    return pre;
  }, []);
  return {
    newArr,
    nextValue,
  };
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    pinAction: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      const pinedExtensions = state.pinedExtensions.includes(payload)
        ? state.pinedExtensions.filter((p) => p !== payload)
        : state.pinedExtensions.concat(payload);
      state.pinedExtensions = pinedExtensions;
      saveStore({ pinedExtensions });
    },
    setRecentExtensions: (
      state,
      { payload }: PayloadAction<EXTENSION_KEY | undefined>
    ) => {
      if (payload) {
        state.recentExtensions = uniq(
          state.recentExtensions.concat(payload).reverse()
        ).slice(0, 5);
        if (
          !state.extensionsInSecond.includes(payload) &&
          !state.extensionsInSecond.includes(payload)
        ) {
          state.activeExtensions = uniq(state.activeExtensions.concat(payload));
        }
        saveStore({
          recentExtensions: state.recentExtensions,
          activeExtensions: state.activeExtensions,
        });
      }
      if (payload && state.extensionsInSecond.includes(payload)) {
        state.activeInSecond = payload;
        saveStore({ activeInSecond: payload });
      } else {
        try {
          state.activePage = payload || "dashboard";
          saveStore({ activePage: state.activePage });
        } catch (e) {
          console.log("🚀 ~ e:", e);
        }
      }
    },
    setActivePage: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.extensionsInSecond.includes(payload)) {
        state.activeInSecond = payload;
        saveStore({ activeInSecond: payload });
      } else {
        state.activePage = payload;
        saveStore({ activePage: payload });
      }
    },
    closeTag: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.activeExtensions.includes(payload)) {
        const { newArr, nextValue } = removeFromArr<EXTENSION_KEY>(
          state.activeExtensions,
          payload
        );
        state.activeExtensions = newArr;
        state.activePage = nextValue;
        saveStore({ activePage: state.activePage, activeExtensions: newArr });
      } else {
        const { newArr, nextValue } = removeFromArr<EXTENSION_KEY>(
          state.extensionsInSecond,
          payload
        );
        state.extensionsInSecond = newArr;
        state.activeInSecond = nextValue;

        saveStore({
          activeInSecond: nextValue,
          extensionsInSecond: newArr,
        });
      }
    },
    closeAllTag: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.activeExtensions.includes(payload)) {
        state.activeExtensions = [];
        state.activePage = "dashboard";
        saveStore({ activePage: state.activePage, activeExtensions: [] });
      } else {
        state.extensionsInSecond = [];
        state.activeInSecond = undefined;

        saveStore({
          activeInSecond: undefined,
          extensionsInSecond: [],
        });
      }
    },
    closeToRight: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      if (state.activeExtensions.includes(payload)) {
        state.activeExtensions = state.activeExtensions.slice(
          0,
          state.activeExtensions.indexOf(payload) + 1
        );
        saveStore({ activeExtensions: state.activeExtensions });
      } else {
        state.extensionsInSecond = state.extensionsInSecond.slice(
          0,
          state.extensionsInSecond.indexOf(payload) + 1
        );
        saveStore({
          extensionsInSecond: state.extensionsInSecond,
        });
      }
    },
    moveToSecondTab: (state, { payload }: PayloadAction<EXTENSION_KEY>) => {
      const { activeExtensions, extensionsInSecond } = state;
      const { newArr, nextValue } = removeFromArr<EXTENSION_KEY>(
        activeExtensions,
        payload
      );
      state.activeExtensions = newArr;
      state.activePage = nextValue;
      state.extensionsInSecond = uniq(extensionsInSecond.concat(payload));
      state.activeInSecond = payload;
      saveStore({
        activeExtensions: newArr,
        activePage: nextValue,
        extensionsInSecond: state.extensionsInSecond,
        activeInSecond: payload,
      });
    },
    syncStore: (state) => {
      Object.keys(state).forEach((key: keyof Partial<AppState>) => {
        const value = window.electron.store.get(key);
        if (value && value !== "deleted") {
          state[key] = window.electron.store.get(key);
        }
      });
    },
  },
});

export const {
  pinAction,
  setRecentExtensions,
  setActivePage,
  closeTag,
  moveToSecondTab,
  syncStore,
  closeAllTag,
  closeToRight,
} = appSlice.actions;

export default appSlice.reducer;
