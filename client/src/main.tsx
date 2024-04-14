import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Main } from './components/Main'
import { SongsProvider } from './contexts/SongsProvider'

import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SongsProvider>
      <RouterProvider router={router} />
    </SongsProvider>
  </React.StrictMode>,
)
