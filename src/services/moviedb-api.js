const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2U1MDM2NmYzMDU0OTZkMWEwMzNlNGUwODViYTI3MSIsIm5iZiI6MTcyODIzOTIxMS40MDI0ODksInN1YiI6IjY3MDJkM2E1OTI1ZmRmOTI1YjdkNTFhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pJ6CRXvfexiAGR8MS9c_uNPkrFvI8AMQEof-4wjZjo4'
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?'

async function fetchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    }
  )

  if (!response.ok) {
    throw new Error(`Could not fetch movies ${response.status}`)
  }

  const movies = await response.json()
  return movies.results
}

export async function loadMovies(query) {
  try {
    const movies = await fetchMovies(query)
    return movies
  } catch (error) {
    console.error(error.message)
  }
}
