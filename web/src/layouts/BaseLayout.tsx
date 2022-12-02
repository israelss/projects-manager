import { PropsWithChildren } from 'react'
import Header from '../components/Header'

const BaseLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <div className='flex flex-col gap-3'>
      <Header />
      <div className="px-4 flex flex-col gap-3">
        {children}
      </div>
    </div>
  )
}

export default BaseLayout
