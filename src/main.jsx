import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MovieLayout from '@/layouts/MovieLayout'
import 'normalize.css'
import '@/styles/main.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieLayout />
  </StrictMode>
)
