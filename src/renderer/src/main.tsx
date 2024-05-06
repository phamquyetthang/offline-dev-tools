import './assets/main.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './components/layouts/theme'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)
