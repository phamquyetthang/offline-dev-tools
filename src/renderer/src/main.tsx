import './assets/main.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './components/layouts/theme'
import { Provider } from 'react-redux'
import { store } from './store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
