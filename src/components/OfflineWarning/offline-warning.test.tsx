import { render, screen } from '@testing-library/react'
import OfflineWarning from '@/components/OfflineWarning'

describe('OfflineWarning component', () => {
  it('отображение компонента', () => {
    render(<OfflineWarning />)
    const offlineWarning = screen.getByText(/Not available in offline mode/)
    expect(offlineWarning).toBeInTheDocument()
  })
})
