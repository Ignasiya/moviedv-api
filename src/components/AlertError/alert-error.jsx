import PropTypes from 'prop-types'
import { Flex, Alert } from 'antd'

export default function AlertError({ message = '' }) {
  return (
    <Flex className='min-h-screen' align='center'>
      <Alert className='w-full' message='Error' description={message} type='error' showIcon />
    </Flex>
  )
}

AlertError.propTypes = {
  message: PropTypes.string
}
