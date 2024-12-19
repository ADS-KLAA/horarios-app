import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import RouterComponent from './routes/index.tsx'
import QueryProvider from './api/QueryProvider.tsx'
import { AuthProvider } from './auth/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <QueryProvider>
      <RouterComponent/>
    </QueryProvider>
    </AuthProvider>
  </StrictMode>,
)
