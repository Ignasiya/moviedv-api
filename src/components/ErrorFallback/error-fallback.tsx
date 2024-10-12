import { Button, Alert } from 'antd'

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role='alert' className='p-5 text-center'>
      <Alert
        className='mb-5'
        message='Something went wrong'
        description={error.message}
        type='error'
        showIcon
      />
      <Button type='primary' onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  )
}
