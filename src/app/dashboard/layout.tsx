import Sidebar from '@/components/side-bar'
import React from 'react'
import SidebarItem from '@/components/sider-item'
import {LayoutDashboard} from 'lucide-react'
import Header from '@/components/Header'

function DashboardLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='flex items-start justify-between'>
      {/* <div className='back'> */}
      <Sidebar/>
      <main className='w-full h-full pl-[300px]'>
      <Header/>     
      {children}
      </main>
      {/* </div> */}
      </div>
  )
}

export default DashboardLayout