import React, { createContext, useState, useEffect, useContext } from 'react'
import Genre from '@/types/Genre'
import { loadGenres } from '@/services/moviedb-api'

interface GenreProviderProps {
  children?: React.ReactNode
}

interface GenreContextType {
  genres: Genre[]
  error: string
  isLoading: boolean
}

const GenreContext = createContext<GenreContextType | undefined>(undefined)

export function CheckGenres() {
  const context = useContext(GenreContext)

  if (!context) {
    throw new Error('useGenres must be used within a GenreProvider')
  }

  return context
}

export function GenreProvider({ children }: GenreProviderProps) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    loadGenres()
      .then(genres => {
        setGenres(genres)
        setIsLoading(false)
        setError('')
      })
      .catch(error => {
        setError('Failed to load genres')
        setIsLoading(false)
        console.error('Failed to load genres:', error)
      })
  }, [])

  return (
    <GenreContext.Provider value={{ genres, error, isLoading }}>{children}</GenreContext.Provider>
  )
}
