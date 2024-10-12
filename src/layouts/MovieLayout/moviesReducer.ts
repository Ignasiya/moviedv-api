import Movie from '@/types/Movie'

interface MoviesResponse {
  results: Movie[]
  total_pages: number
  page: number
}

interface State {
  movies: MoviesResponse
  isLoading: boolean
  error: string
  search: string
  page: number
}

type Action =
  | { type: 'movies'; movies: MoviesResponse }
  | { type: 'loading'; loading: boolean }
  | { type: 'error'; error: string }
  | { type: 'search'; search: string }
  | { type: 'page'; page: number }

export const initialState: State = {
  movies: { results: [], total_pages: 0, page: 0 },
  isLoading: false,
  error: '',
  search: '',
  page: 1
}

export function moviesReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'movies':
      return { ...state, movies: action.movies, isLoading: false }
    case 'loading':
      return { ...state, isLoading: action.loading }
    case 'error':
      return { ...state, error: action.error, isLoading: false }
    case 'search':
      return { ...state, search: action.search, page: 1 }
    case 'page':
      return { ...state, page: action.page }
    default:
      return state
  }
}
