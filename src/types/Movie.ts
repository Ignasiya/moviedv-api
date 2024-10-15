export default interface Movie {
  readonly id: number
  title: string
  poster_path: string | null
  release_date: string
  genre_ids: number[]
  overview: string
  vote_average: number
}
