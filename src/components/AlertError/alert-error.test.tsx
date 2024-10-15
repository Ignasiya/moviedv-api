import { render, screen } from '@testing-library/react'
import AlertError from '@/components/AlertError'

describe('AlertError', () => {
  it('рендер компонента', () => {
    render(<AlertError message='test' />)
    expect(screen.getByText(/Error/i)).toBeInTheDocument()
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})
