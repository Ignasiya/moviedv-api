import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MovieLayout from '@/layouts/MovieLayout'
import 'normalize.css'
import '@/styles/main.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <MovieLayout />
    </StrictMode>
  )
} else {
  console.error('Failed to find root element with id "root"')
}
