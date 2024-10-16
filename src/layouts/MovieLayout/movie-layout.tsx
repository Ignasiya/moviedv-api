import React, { useEffect, useRef, useReducer } from 'react'
import { loadMovies } from '@/services/moviedb-api'
import MovieListFeatures from '@/features/MovieListFeatures'
import { debounce } from 'lodash'
import { Input } from 'antd'
import { initialState, moviesReducer } from '@/reducer/moviesReducer'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorFallback'

export default function MovieLayout() {
  const [state, dispatch] = useReducer(moviesReducer, initialState)
  const { movies, isLoading, error, search, page } = state

  const debouncedSearch = useRef(
    debounce((query, page) => {
      dispatch({ type: 'error', error: '' })
      dispatch({ type: 'loading', loading: true })

      loadMovies(query, page)
        .then(moviesResponse => {
          dispatch({ type: 'movies', movies: moviesResponse })
        })
        .catch(error => {
          dispatch({ type: 'error', error: error.message })
        })
    }, 500)
  ).current

  const onPagination = (page: number) => {
    dispatch({ type: 'page', page })
  }

  useEffect(() => {
    if (search.trim()) {
      debouncedSearch(search, page)
    } else {
      dispatch({ type: 'movies', movies: { results: [], total_pages: 0, page: 0 } })
    }
  }, [search, page, debouncedSearch])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'search', search: event.target.value })
  }

  const handleResetSearch = () => {
    dispatch({ type: 'search', search: '' })
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => handleResetSearch}>
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
        onPagination={onPagination}
      />
    </ErrorBoundary>
  )
}
