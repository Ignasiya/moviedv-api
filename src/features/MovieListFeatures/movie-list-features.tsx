import MovieList from '@/components/MovieList'
import AlertError from '@/components/AlertError'
import Loader from '@/components/Loader'
import { Flex, Typography } from 'antd'
import Movie from '@/types/Movie'

const { Text } = Typography

interface MovieListFeaturesProps {
  movies: { results: Movie[]; page: number; total_pages: number }
  isLoading: boolean
  error: string
  query: string
  onPagination: (page: number) => void
}

export default function MovieListFeatures({
  movies,
  isLoading,
  error,
  query,
  onPagination
}: MovieListFeaturesProps) {
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
