import { useState, useEffect } from 'react'
import { loadMovies } from '@/services/moviedb-api'
import MovieListFeatures from '@/features/MovieListFeatures'
import Offline from '@/components/Offline'

export default function MovieLayout() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    window.addEventListener('offline', updateNetworkStatus)
    window.addEventListener('online', updateNetworkStatus)

    if (!navigator.onLine) {
      setIsOffline(true)
      setIsLoading(false)
    } else {
      loadMovies('return')
        .then(moviesResponse => {
          setMovies(moviesResponse)
          setIsLoading(false)
          setError('')
        })
        .catch(error => {
          setIsLoading(false)
          setError(error.message)
        })
    }

    return () => {
      window.removeEventListener('offline', updateNetworkStatus)
      window.removeEventListener('online', updateNetworkStatus)
    }
  }, [])

  return isOffline ? (
    <Offline />
  ) : (
    <main className='container h-full mx-auto max-w-lg px-10 py-5 bg-white'>
      <MovieListFeatures movies={movies} isLoading={isLoading} error={error} />
    </main>
  )
}
