import { useState, useEffect } from 'react'
import { loadMovies } from '@/services/moviedb-api'
import OfflineWarning from '@/components/OfflineWarning'
import { Online, Offline } from 'react-detect-offline'
import MovieListFeatures from '@/features/MovieListFeatures'

export default function MovieLayout() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')

    loadMovies('return')
      .then(moviesResponse => {
        setMovies(moviesResponse)
        setIsLoading(false)
      })
      .catch(error => {
        setIsLoading(false)
        setError(error.message)
      })
  }, [])

  return (
    <main className='container h-full mx-auto max-w-lg px-10 py-5 bg-white'>
      <Online>
        <MovieListFeatures movies={movies} isLoading={isLoading} error={error} />
      </Online>
      <Offline>
        <OfflineWarning />
      </Offline>
    </main>
  )
}
