import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import dotenv from 'dotenv'

import { useSelector, useDispatch } from 'react-redux'
import { setTrue, setFalse } from '../redux/content/verifyUser'

const login = () => {

    // dotenv.config();
    const verifyUser = useSelector((state) => state.verifyUser)

    const apiData = import.meta.env.VITE_MONGODB

    const dispatch = useDispatch()

    const navigate = useNavigate()

    useEffect(() => {
        verifyUser ? navigate('/') : ''
    }, [])


    const [formdata, setformdata] = useState({
        name: '',
        roll_no: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setformdata({
            ...formdata,
            [name]: value})
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(formdata)
        const getdata = await axios.get(apiData)
        const data = getdata.data
        // const data = getdata
        // console.log('All data ////', data[0].Roll_No)
        console.log(formdata)
        const userdata = await data.filter((e) => formdata.roll_no.toString() == e.roll_no.toString());
        // console.log(userdata[0].id)
        console.log(userdata)

        userdata.length > 0 ? (alert(`welcome back ${userdata[0].name}`),
            localStorage.setItem('user', JSON.stringify(userdata)),
            dispatch(setTrue()),
            navigate('/alltodos')
            // navigate(`/todo/${userdata[0].id}`),
            // localStorage.setItem('user',Json.stringify(userdata))
        ) : (alert('Rol-No. is not exist. Please create user'), navigate('/form'))

    }

    return (
        <div className='w-full h-screen '>
            

            <div className="min-h-screen bg-transparent py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Login</h1>
                            </div>
                            <div className="divide-y  divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative ">
                                        <input onChange={handleChange} name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" />
                                        <label for="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                                    </div>
                                    <div className="relative ">
                                        <input onChange={handleChange} name="roll_no" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Roll_No" />
                                        <label for="roll_no" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Roll_No</label>
                                    </div>
                                    <div className="flex justify-center ">
                                        <button onClick={handlesubmit} className="bg-cyan-500 mt-4 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </div>


        </div >
    )
}

export default login


