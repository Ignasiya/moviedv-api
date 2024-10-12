import { Row, Col, Pagination } from 'antd'
import MovieCard from '@/components/MovieCard'
import Movie from '@/types/Movie'

interface MovieListProps {
  movies: { results: Movie[]; page: number; total_pages: number }
  onPagination: (page: number) => void
}

export default function MovieList({ movies, onPagination }: MovieListProps) {
  return (
    <>
      <Row gutter={[36, 36]} justify='center'>
        {movies.results.map(movie => {
          return (
            <Col md={24} lg={12} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          )
        })}
      </Row>
      <Pagination
        className='mt-10'
        align='center'
        current={movies.page}
        onChange={onPagination}
        showSizeChanger={false}
        total={movies.total_pages * 10}
      />
    </>
  )
}
