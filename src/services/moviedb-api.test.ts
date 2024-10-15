import { loadMovies } from './moviedb-api'

beforeEach(() => {
  vi.resetAllMocks()
})

describe('fetchMovies', () => {
  it('следует извлекать фильмы с правильными параметрами', async () => {
    const mockMoviesResponse = {
      results: [{ title: 'Movie 1' }, { title: 'Movie 2' }]
    }

    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify(mockMoviesResponse), {
          status: 200,
          headers: { 'Content-type': 'application/json' }
        })
      )
    )

    const query = 'Return'
    const page = 1
    const movies = await loadMovies(query, page)

    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?query=Return&include_adult=false&language=en-US&page=1`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: expect.any(String)
        }
      }
    )

    expect(movies).toEqual(mockMoviesResponse)
  })

  it('должно выдаваться сообщение об ошибке, если ответ не в ok', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(null, {
          status: 404,
          statusText: 'Not Found'
        })
      )
    )

    await expect(loadMovies('NonExistingMovie', 1)).rejects.toThrow('Could not fetch movies 404')
  })
})
