import { GenreProvider } from '@/context/GenreContext'
import { GuestProvider } from '@/context/GuestSessionContext'
import MovieLayout from '@/layouts/MovieLayout'
import OfflineWarning from '@/components/OfflineWarning'
import { Online, Offline } from 'react-detect-offline'

export default function MoviePage() {
  return (
    <>
      <Online>
        <GenreProvider>
          <GuestProvider>
            <MovieLayout />
          </GuestProvider>
        </GenreProvider>
      </Online>
      <Offline>
        <OfflineWarning />
      </Offline>
    </>
  )
}
