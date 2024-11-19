import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector }  from 'react-redux'


const Todo = () => {

  const apiData = useSelector((state) => state.apiData)

    const {id} = useParams()
    const [todo, settodo] = useState([])
    useEffect(() => {
        console.log(id)
        const getdata = async () => {
            const fetchData = await axios.get(apiData)
            const data = fetchData.data
            const filterdata = data.find((e)=>{ return  e._id == id})
            settodo([filterdata])
            console.log(filterdata)
        }
        getdata();
    },[])
    

  return (
    <div className='w-full'>
        
        <div className=" flex  w-[90vw] ">
      <div className="w-full ">
        <ul className='w-full '>

        {todo != null ? (
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="pl-2 border text-start">Sr. no.</th>
            <th className="py-2 px-4 border text-start">Name</th>
            <th className="py-2 px-4 border text-start">Roll No.</th>
            <th className="py-2 px-4 border text-start">School</th>
            <th className="py-2 px-4 border text-start">Address</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((items, index) => (
            <tr key={index} className="border-b ">
              <td className="py-2 pl-5 font-medium border-r">{index + 1}</td>
              <td className="py-2 px-4">{items.name}</td>
              <td className="py-2 px-4">{items.roll_no}</td>
              <td className="py-2 px-4">{items.school}</td>
              <td className="py-2 px-4">{items.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No data available</p>
    )}



        </ul>
      </div>
    </div>
    </div>
  )
}

export default Todo
