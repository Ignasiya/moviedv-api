import { Row, Col, Pagination } from 'antd'
import PropTypes from 'prop-types'
import MovieCard from '@/components/MovieCard'

export default function MovieList({ movies = {}, onPagination }) {
  return (
    <>
      <Row gutter={[36, 36]} justify='center'>
        {movies.results.map(movie => {
          const { id, ...movieInfo } = movie
          return (
            <Col md={24} lg={12} key={id}>
              <MovieCard movie={movieInfo} />
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

MovieList.propTypes = {
  movies: PropTypes.object,
  onPagination: PropTypes.func
}
