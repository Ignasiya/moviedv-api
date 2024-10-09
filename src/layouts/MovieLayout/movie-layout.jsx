import { useState, useEffect, useRef } from 'react'
import { loadMovies } from '@/services/moviedb-api'
import OfflineWarning from '@/components/OfflineWarning'
import { Online, Offline } from 'react-detect-offline'
import MovieListFeatures from '@/features/MovieListFeatures'
import { debounce } from 'lodash'
import { Input } from 'antd'

export default function MovieLayout() {
  const [movies, setMovies] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const debouncedSearch = useRef(
    debounce((query, page) => {
      setIsLoading(true)
      setError('')

      loadMovies(query, page)
        .then(moviesResponse => {
          setMovies(moviesResponse)
          setIsLoading(false)
        })
        .catch(error => {
          setIsLoading(false)
          setError(error.message)
        })
    }, 500)
  ).current

  const onPagination = page => {
    setPage(page)
  }

  useEffect(() => {
    if (search) {
      debouncedSearch(search, page)
    }
  }, [search, page, debouncedSearch])

  const handleSearch = event => {
    setSearch(event.target.value)
    setPage(1)
  }

  return (
    <main className='container h-full mx-auto max-w-lg px-10 py-5 bg-white'>
      <Online>
        <Input
          className='mb-9 h-10 text-base'
          placeholder='Type to search...'
          value={search}
          onChange={handleSearch}
        />
        <MovieListFeatures
          movies={movies}
          isLoading={isLoading}
          error={error}
          query={search}
          onPagination={onPagination}
        />
      </Online>
      <Offline>
        <OfflineWarning />
      </Offline>
    </main>
  )
}
