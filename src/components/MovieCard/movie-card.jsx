import { Card, Tag } from 'antd'
import { format } from 'date-fns'
import { truncateText } from '@/utils'
import PropTypes from 'prop-types'

const { Meta } = Card

export default function MovieCard({ movie = {} }) {
  const { title, poster_path, release_date, genre_ids, overview } = movie

  const releaseDate = release_date ? new Date(release_date) : null
  const formattedDate = releaseDate ? format(releaseDate, 'MMMM d, yyyy') : 'Unknown Date'

  return (
    <Card
      hoverable
      className='max-w-[451px] h-[279px] rounded-none bg-white shadow-lg overflow-hidden flex'
      cover={
        <img
          className='h-full max-w-[183px] object-cover'
          style={{ borderRadius: '0px' }}
          alt={title}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/original${poster_path}`
              : 'images/no-poster.jpg'
          }
        />
      }
    >
      <Meta
        title={<h3>{title}</h3>}
        description={
          <div className='max-w-[228px] flex flex-col gap-2'>
            <p>{formattedDate}</p>
            <div>
              {genre_ids.map((genre, index) => (
                <Tag className='text-gray-400' key={index}>
                  {genre}
                </Tag>
              ))}
            </div>
            <p className='truncated-text text-xs leading-5 text-black'>
              {overview ? truncateText(overview) : 'There is no description'}
            </p>
          </div>
        }
      />
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    overview: PropTypes.string,
    poster_path: PropTypes.string
  })
}
