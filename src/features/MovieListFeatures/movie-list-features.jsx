import PropTypes from 'prop-types'
import MovieList from '@/components/MovieList'
import AlertError from '@/components/AlertError'
import Loader from '@/components/Loader'
import { Flex, Typography } from 'antd'

const { Text } = Typography

export default function MovieListFeatures({ movies, isLoading, error, query, onPagination }) {
  return isLoading ? (
    <Loader />
  ) : error ? (
    <AlertError message={error} />
  ) : movies.results?.length && query ? (
    <MovieList movies={movies} onPagination={onPagination} />
  ) : (
    <Flex align='center' justify='center'>
      <Text className='text-lg' strong>
        No movies found
      </Text>
    </Flex>
  )
}

MovieListFeatures.propTypes = {
  movies: PropTypes.object,
  onPagination: PropTypes.func,
  isLoading: PropTypes.bool,
  query: PropTypes.string,
  error: PropTypes.string
}
