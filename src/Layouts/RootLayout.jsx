import React from 'react'
import Navbar from '../Pages/Shared/Navbar/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className='pt-30 w-[90%] mx-auto min-h-[calc(100vh-270px)]'>
            <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default RootLayout
