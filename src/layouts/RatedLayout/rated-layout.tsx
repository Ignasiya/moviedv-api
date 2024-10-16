import React, { useEffect, useReducer } from 'react'
import { loadRatedMovies } from '@/services/moviedb-api'
import MovieListFeatures from '@/features/MovieListFeatures'
import { initialState, moviesReducer } from '@/reducer/moviesReducer'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@/components/ErrorFallback'
import { CheckGuestContext } from '@/context/GuestSessionContext'

export default function RatedLayout() {
  const [state, dispatch] = useReducer(moviesReducer, initialState)
  const { movies, isLoading, error, page } = state
  const sessionKey = CheckGuestContext()

  const onPagination = (page: number) => {
    dispatch({ type: 'page', page })
  }

  useEffect(() => {
    dispatch({ type: 'error', error: '' })
    dispatch({ type: 'loading', loading: true })

    loadRatedMovies(sessionKey, page)
      .then(moviesResponse => {
        dispatch({ type: 'movies', movies: moviesResponse })
      })
      .catch(error => {
        dispatch({ type: 'error', error: error.message })
      })
  }, [page, sessionKey])

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MovieListFeatures
        movies={movies}
        isLoading={isLoading}
        error={error}
        onPagination={onPagination}
      />
    </ErrorBoundary>
  )
}
