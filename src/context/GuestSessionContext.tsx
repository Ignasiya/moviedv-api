import React, { createContext, useContext, useState, useEffect } from 'react'
import { createGuestSession } from '@/services/moviedb-api'

interface GuestSessionContextProps {
  children?: React.ReactNode
}

interface GuestSessionContextType {
  sessionKey: string
  errorSession: string
}

const GuestContext = createContext<GuestSessionContextType | undefined>(undefined)

export function CheckGuestContext() {
  const context = useContext(GuestContext)
  if (!context) {
    throw new Error('GuestContext must be used within a GuestProvider')
  }
  return context
}

export function GuestProvider({ children }: GuestSessionContextProps) {
  const [sessionKey, setSessionKey] = useState<string>('')
  const [errorSession, setError] = useState<string>('')

  useEffect(() => {
    createGuestSession()
      .then(key => {
        setSessionKey(key)
        setError('')
      })
      .catch(error => {
        setError('Failed to create guest session')
        console.error('Failed to create guest session:', error)
      })
  }, [])

  return (
    <GuestContext.Provider value={{ sessionKey, errorSession }}>{children}</GuestContext.Provider>
  )
}
