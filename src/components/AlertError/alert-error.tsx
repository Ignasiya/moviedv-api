import { Flex, Alert } from 'antd'

interface AlertErrorProps {
  message: string
}

export default function AlertError({ message }: AlertErrorProps) {
  return (
    <Flex align='center'>
      <Alert className='w-full' message='Error' description={message} type='error' showIcon />
    </Flex>
  )
}
