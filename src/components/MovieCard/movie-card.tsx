import { Card, Tag } from 'antd'
import { format } from 'date-fns'
import { truncateText } from '@/utils'
import Movie from '@/types/Movie'

const { Meta } = Card

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
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
        title={<h3 className='max-w-[228px] truncate'>{title}</h3>}
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
            <p className='text-xs leading-5 text-black'>
              {overview ? truncateText(overview) : 'There is no description'}
            </p>
          </div>
        }
      />
    </Card>
  )
}
