import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

export default function Loader() {
  return (
    <Flex className='min-h-screen' justify='center' align='center'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  )
}
