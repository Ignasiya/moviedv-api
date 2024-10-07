import { useState, useEffect } from 'react'
import { loadMovies } from '@/services/moviedb-api'
import MovieList from '@/components/MovieList'

export default function MovieLayout() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    loadMovies('return')
      .then(moviesResponse => setMovies(moviesResponse))
      .catch(console.error)
  }, [])

  return (
    <main className='container h-full mx-auto max-w-lg px-10 py-5 bg-white'>
      <MovieList movies={movies} />
    </main>
  )
}
