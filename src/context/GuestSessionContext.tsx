import React, { createContext, useContext, useState, useEffect } from 'react'
import { createGuestSession } from '@/services/moviedb-api'

interface GuestSessionContextProps {
  children?: React.ReactNode
}

const GuestContext = createContext<string | undefined>(undefined)

export function CheckGuestContext() {
  const context = useContext(GuestContext)
  if (!context) {
    throw new Error('GuestContext must be used within a GuestProvider')
  }
  return context
}

export function GuestProvider({ children }: GuestSessionContextProps) {
  const [sessionKey, setSessionKey] = useState<string>('')

  useEffect(() => {
    const storedSession = localStorage.getItem('guest_session')
    if (storedSession) {
      const { guest_session_id, expires_at } = JSON.parse(storedSession)

      if (new Date() < new Date(expires_at)) {
        setSessionKey(guest_session_id)
        return
      }
    }

    createGuestSession()
      .then(session => {
        const { guest_session_id, expires_at } = session

        const sessionData = {
          guest_session_id,
          expires_at
        }
        localStorage.setItem('guest_session', JSON.stringify(sessionData))
        setSessionKey(guest_session_id)
      })
      .catch(error => {
        console.error('Failed to create guest session:', error)
      })
  }, [])

  return <GuestContext.Provider value={sessionKey}>{children}</GuestContext.Provider>
}
