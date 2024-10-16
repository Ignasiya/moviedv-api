import { GenreProvider } from '@/context/GenreContext'
import { GuestProvider } from '@/context/GuestSessionContext'
import MovieLayout from '@/layouts/MovieLayout'
import RatedLayout from '@/layouts/RatedLayout'
import OfflineWarning from '@/components/OfflineWarning'
import { Online, Offline } from 'react-detect-offline'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

export default function MoviePage() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Search',
      children: <MovieLayout />
    },
    {
      key: '2',
      label: 'Rated',
      children: <RatedLayout />
    }
  ]
  return (
    <>
      <Online>
        <GenreProvider>
          <GuestProvider>
            <main className='container h-full mx-auto max-w-lg lg:px-10 lg:py-5 p-3 bg-white'>
              <Tabs defaultActiveKey='1' items={items} centered destroyInactiveTabPane />
            </main>
          </GuestProvider>
        </GenreProvider>
      </Online>
      <Offline>
        <OfflineWarning />
      </Offline>
    </>
  )
}
