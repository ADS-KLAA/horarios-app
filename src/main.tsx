import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import RouterComponent from './routes/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterComponent/>
  </StrictMode>,
)
