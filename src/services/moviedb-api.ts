const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2U1MDM2NmYzMDU0OTZkMWEwMzNlNGUwODViYTI3MSIsIm5iZiI6MTcyODIzOTIxMS40MDI0ODksInN1YiI6IjY3MDJkM2E1OTI1ZmRmOTI1YjdkNTFhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pJ6CRXvfexiAGR8MS9c_uNPkrFvI8AMQEof-4wjZjo4'

const BASE_URL = 'https://api.themoviedb.org/3'

async function handleResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }
  return await response.json()
}

function getHeaders() {
  return {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

async function fetchGuestSession() {
  const response = await fetch(`${BASE_URL}/authentication/guest_session/new`, {
    method: 'GET',
    headers: getHeaders()
  })

  const session = await handleResponse(response)
  return session
}

async function fetchMovies(query: string, page: number) {
  const params = new URLSearchParams({
    query: query,
    include_adult: 'false',
    language: 'en-US',
    page: page.toString()
  })

  const response = await fetch(`${BASE_URL}/search/movie?${params.toString()}`, {
    method: 'GET',
    headers: getHeaders()
  })

  const movies = await handleResponse(response)
  return movies
}

async function fetchGenres() {
  const response = await fetch(`${BASE_URL}/genre/movie/list?language=en-US`, {
    method: 'GET',
    headers: getHeaders()
  })

  const genres = await handleResponse(response)
  return genres.genres
}

async function fetchRateMovie(movieId: number, rating: number, guestSessionId: string) {
  const params = new URLSearchParams({
    guest_session_id: guestSessionId
  })

  const response = await fetch(`${BASE_URL}/movie/${movieId}/rating?${params.toString()}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ value: rating })
  })

  await handleResponse(response)
}

async function fetchRatedMovies(guestSessionId: string, page: number = 1) {
  const params = new URLSearchParams({
    language: 'en-US',
    page: page.toString(),
    sort_by: 'created_at.asc'
  })

  const response = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?${params.toString()}`,
    {
      method: 'GET',
      headers: getHeaders()
    }
  )
  const ratedMovies = await handleResponse(response)
  return ratedMovies
}

export async function createGuestSession() {
  return await fetchGuestSession()
}

export async function loadMovies(query: string, page: number) {
  return await fetchMovies(query, page)
}

export async function loadGenres() {
  return await fetchGenres()
}

export async function rateMovie(movieId: number, rating: number, guestSessionId: string) {
  return await fetchRateMovie(movieId, rating, guestSessionId)
}

export async function loadRatedMovies(guestSessionId: string, page: number) {
  return await fetchRatedMovies(guestSessionId, page)
}
