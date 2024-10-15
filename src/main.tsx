import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MoviePage from './pages/MoviePage'
import 'normalize.css'
import '@/styles/main.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MoviePage />
    </StrictMode>
  )
} else {
  console.error('Failed to find root element with id "root"')
}
