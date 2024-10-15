import { render, screen, fireEvent } from '@testing-library/react'
import ErrorFallback from './error-fallback'

describe('ErrorFallback', () => {
  it('рендер компонента с сообщением об ошибке', () => {
    const mockError = new Error('Ошибка загрузки!')

    render(<ErrorFallback error={mockError} resetErrorBoundary={vi.fn()} />)
    expect(screen.getByText(/Ошибка загрузки!/i)).toBeInTheDocument()
  })

  it('вызывает callback resetErrorBoundary при клике на кнопку', () => {
    const mockResetErrorBoundary = vi.fn()

    render(
      <ErrorFallback
        error={new Error('Ошибка загрузки!')}
        resetErrorBoundary={mockResetErrorBoundary}
      />
    )

    const button = screen.getByRole('button', { name: /try again/i })
    fireEvent.click(button)

    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1)
  })
})
