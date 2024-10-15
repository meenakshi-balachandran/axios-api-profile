import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <div className='h-full flex w-screen bg-gray-100'>
    <SideBar/>
    <Outlet/>
    </div>
  )
}

export default PageLayout