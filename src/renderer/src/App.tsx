import { FC } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import { Layout } from './layout'
import { CATEGORIES } from './models/extensions'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      ...CATEGORIES.map((c) => ({
        path: c.path,
        element: c.page
      }))
      // ...EXTENSIONS.map((extension) => ({
      //   path: extension.path,
      //   element: extension.page
      // }))
    ]
  }
])

const App: FC = () => {
  return <RouterProvider router={router} />
}

export default App
