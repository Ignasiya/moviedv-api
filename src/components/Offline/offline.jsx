import { Result } from 'antd'

export default function Offline() {
  return (
    <Result
      status='warning'
      title='Not available in offline mode'
      subTitle='Please connect to the internet for the latest news and recommendations.'
    />
  )
}
