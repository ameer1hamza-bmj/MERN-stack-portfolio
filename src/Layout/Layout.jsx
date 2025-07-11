import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const hideHeaderFooter = ['/login', '/register'].includes(location.pathname)

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main className={`${!hideHeaderFooter ? 'pt-20' : ''}`}>
        <Outlet />
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default Layout
