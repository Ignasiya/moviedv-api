import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import MovieCard from '@/components/MovieCard'

export default function MovieList({ movies = [] }) {
  return (
    <Row gutter={[36, 36]} justify='center'>
      {movies.map(movie => {
        const { id, ...movieInfo } = movie
        return (
          <Col md={24} lg={12} key={id}>
            <MovieCard movie={movieInfo} />
          </Col>
        )
      })}
    </Row>
  )
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object)
}
