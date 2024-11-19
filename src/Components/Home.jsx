import React from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'


const Home = () => {
  const verifyUser = useSelector((state) => state.verifyUser)

  const navigate = useNavigate()

  useEffect(() => {
   verifyUser ? '': navigate('./login')
  }, [])
  

  return (
    <>
        <Navbar />
        <Outlet />

    </>
  )
}

export default Home
