import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Row, Col, Card, Tag } from 'antd'
import { format } from 'date-fns'
import { truncateText } from '@/utils'
import 'normalize.css'
import '@/styles/main.css'

const { Meta } = Card

const movie = {
  title: 'Star Wars: A New Hope',
  releaseDate: '1977-05-25',
  tags: ['Sci-Fi', 'Adventure', 'Fantasy'],
  description:
    "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
  imageUrl: 'https://starwars-visualguide.com/assets/img/films/1.jpg'
}

const formattedDate = format(new Date(movie.releaseDate), 'MMMM d, yyyy')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className='container h-full mx-auto max-w-lg px-10 py-5 bg-white'>
      <Row gutter={[36, 36]} justify='center'>
        <Col md={24} lg={12}>
          <Card
            hoverable
            className='max-w-[451px] h-[279px] rounded-none bg-white shadow-lg overflow-hidden flex'
            cover={
              <img
                className='h-full max-w-[183px] object-cover'
                style={{ borderRadius: '0px' }}
                alt={movie.title}
                src={movie.imageUrl}
              />
            }
          >
            <Meta
              title={<h3>{movie.title}</h3>}
              description={
                <div className='max-w-[228px] flex flex-col gap-2'>
                  <p>{formattedDate}</p>
                  <div>
                    {movie.tags.map((tag, index) => (
                      <Tag className='text-gray-400' key={index}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <p className='truncated-text text-xs leading-5 text-black'>
                    {truncateText(movie.description)}
                  </p>
                </div>
              }
            />
          </Card>
        </Col>
        <Col md={24} lg={12}>
          <Card
            hoverable
            className='max-w-[451px] h-[279px] rounded-none bg-white shadow-lg overflow-hidden flex'
            cover={
              <img
                className='h-full max-w-[183px] object-cover'
                style={{ borderRadius: '0px' }}
                alt={movie.title}
                src={movie.imageUrl}
              />
            }
          >
            <Meta
              title={<h3>{movie.title}</h3>}
              description={
                <div className='max-w-[228px] flex flex-col gap-2'>
                  <p>{formattedDate}</p>
                  <div>
                    {movie.tags.map((tag, index) => (
                      <Tag className='text-gray-400' key={index}>
                        {tag}
                      </Tag>
                    ))}
                  </div>
                  <p className='truncated-text text-xs leading-5 text-black'>
                    {truncateText(movie.description)}
                  </p>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>
    </main>
  </StrictMode>
)
