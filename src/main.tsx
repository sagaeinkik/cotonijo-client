import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from "./routing.tsx"
import './index.scss'
import { AuthProvider } from './assets/context/AuthContext.tsx'
import { ReviewProvider } from './assets/context/ReviewContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ReviewProvider>
        <RouterProvider router={router} />
      </ReviewProvider>
    </AuthProvider>
  </StrictMode>,
)
