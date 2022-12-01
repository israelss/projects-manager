import { PropsWithChildren } from 'react'
import Header from '../components/Header'

const BaseLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default BaseLayout
