import PropTypes from 'prop-types'
import MovieList from '@/components/MovieList'
import AlertError from '@/components/AlertError'
import Loader from '@/components/Loader'

export default function MovieListFeatures({ movies, isLoading, error }) {
  return isLoading ? (
    <Loader />
  ) : error ? (
    <AlertError message={error} />
  ) : (
    <MovieList movies={movies} />
  )
}

MovieListFeatures.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.string
}
