import { Result, Flex } from 'antd'

export default function Offline() {
  return (
    <Flex justify='center' align='center'>
      <Result
        status='warning'
        title='Not available in offline mode'
        subTitle='Please connect to the internet for the latest news and recommendations.'
      />
    </Flex>
  )
}
