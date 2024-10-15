import { render } from '@testing-library/react'
import Loader from '@/components/Loader'

describe('Loader component', () => {
  it('отображение загрузки', () => {
    const { getByRole } = render(<Loader />)
    const spinElement = getByRole('img')

    expect(spinElement).toBeInTheDocument()
  })
})
