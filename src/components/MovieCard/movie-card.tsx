import { Card, Tag, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { truncateText } from '@/utils'
import Movie from '@/types/Movie'
import Rating from '@/components/Rating'
import StarRating from '@/components/StarRating'
import { CheckGenres } from '@/context/GenreContext'
import { CheckGuestContext } from '@/context/GuestSessionContext'
import { rateMovie } from '@/services/moviedb-api'

const { Meta } = Card

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { id, title, poster_path, release_date, vote_average, genre_ids, overview } = movie
  const { genres, error, isLoading } = CheckGenres()
  const { sessionKey } = CheckGuestContext()

  const handleRateMovie = (rating: number) => {
    if (sessionKey) {
      rateMovie(id, rating, sessionKey)
    }
  }

  const genresMovie = genre_ids.map(genreId => genres.find(genre => genre.id === genreId))
  const releaseDate = release_date ? new Date(release_date) : null
  const formattedDate = releaseDate ? format(releaseDate, 'MMMM d, yyyy') : 'Unknown Date'

  return (
    <Card
      hoverable
      className='lg:max-w-[451px] lg:h-[279px] max-w-[387px] h-[245px]  rounded-none bg-white shadow-lg overflow-hidden flex relative cursor-default'
      cover={
        <img
          className='h-full mt-4 ml-4 lg:mt-0 lg:ml-0 lg:max-w-[183px] lg:max-h-full max-h-[90px] max-w-[60px] object-cover absolute lg:static'
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
        title={<h3 className='lg:max-w-[180px] max-w-[220px] truncate ml-16 lg:ml-0'>{title}</h3>}
        description={
          <div className='lg:max-w-[228px] max-w-full lg:h-[200px] h-[170px] flex flex-col gap-2'>
            <div className='absolute top-5 right-5'>
              <Rating rating={vote_average} />
            </div>
            <p className='ml-16 lg:ml-0'>{formattedDate}</p>
            <div className='ml-16 lg:ml-0 flex flex-wrap gap-y-1'>
              {isLoading ? (
                <Spin indicator={<LoadingOutlined spin />} size='small' />
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                genresMovie &&
                genresMovie.map(genre => (
                  <Tag className='text-gray-400' key={genre?.id}>
                    {genre?.name}
                  </Tag>
                ))
              )}
            </div>
            <p className='text-xs leading-5 text-black w-[339px] lg:w-auto'>
              {overview ? truncateText(overview) : 'There is no description'}
            </p>
            <div className='mt-auto ml-auto'>
              <StarRating onRateMovie={handleRateMovie} />
            </div>
          </div>
        }
      />
    </Card>
  )
}
