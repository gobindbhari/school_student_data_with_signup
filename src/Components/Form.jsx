import React from 'react'
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router-dom';
import uuid4 from "uuid4";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import dotenv from 'dotenv'


const Form = () => {

  // dotenv.config()

  const apiData = import.meta.env.VITE_MONGODB
  const k = useParams();
  // console.log(k, "kkkk")
  const { register, handleSubmit, resetField, setValue, formState: { errors } } = useForm();
  const [editingTodo, setEditingTodo] = useState(null); // Track the todo being edited


  let id = uuid4();
  
  const [todo, settodo] = useState({
    name: '',
    roll_No: '',
    school: '',
    address: '',
    id: ''
  });
  const [data, setdata] = useState([]);
  const [formdata, setformdata] = useState()
  const navigate = useNavigate();


  const gotoform = (e) => {
    navigate(`/alltodos`)
  }

  const onSubmit = (data) => {
    (async () => {
    console.log(data)
    const newdata = { ...data, '_id': id }
    console.log(newdata)
    console.log(k.id, " k idddddddddddddddddddd")
  // debugger
    if (k.id) {
      console.log(`${apiData}/${k.id}`)
      await axios.put(`${apiData}/${k.id}`, data)
      console.log('updat dataaaaaaa',newdata)
      alert('form successfuly updated')
    } else {
      await axios.post(apiData, newdata);
      console.log('post dataaaaaaa',newdata)
      alert('form successfuly submited')
    }
    setformdata(newdata);
    reset();
    })()
    // gotoform() // go to alltodos
    // useNavigate('/form');
  }


  if (k) {
    useEffect(() => {
      console.log(k.id)
      const getdata = async () => {
        // const fetchdata = await axios.get("http://localhost:5000/data");
        const fetchdata = await axios.get(apiData);
        console.log("fetchdata", fetchdata.data)
        const data = fetchdata.data
        const newdata = data.find((v) => {
          return v._id == k.id
        })

        console.log(newdata)
        const { name, roll_no, school, address } = newdata
        setValue('name', name);
        setValue('roll_no', roll_no);
        setValue('school', school);
        setValue('address', address);
        console.log(k)

      }

      getdata();
    }, []
    )
  }

  function reset() {
    resetField
    resetField('name', '');
    resetField('roll_no', '');
    resetField('school', '');
    resetField('address', '');
  }

  const validaterollNo = async (value) => {
    if (!k) {
      // const getdata = await axios.get("http://localhost:5000/data");
      const getdata = await axios.get(apiData);
      const data = getdata.data
      console.log(data)
      const filterdata = data.filter(e => e.roll_No == value)
      if (filterdata.length > 0) {
        return "This Roll No. already exists";
      }
      return true; // Validation passed
    }
  }
  return (
    <>

      <div className='w-3/4 m-auto  '>
        <div className=" mx-auto bg-[#E9EFEC] shadow-lg rounded-lg overflow-hidden mt-16">
          <div className="px-4 py-2">
            <h1 className="text-gray-800 font-bold text-2xl uppercase pb-8">To-Do List</h1>
            <div className='w-5/6 m-auto'>

              <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="flex flex-col gap-6 m-auto">

                  <input className="bg-[#fff]  appearance-none  border-none w-full text-gray-700 mr-3 py-2 px-4 rounded-lg leading-tight focus:outline-none" placeholder='Name' id={id} {...register("name", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Name must be at least 4 characters long"
                    },
                    maxLength: {
                      value: 15,
                      message: "Name must not exceed 15 characters"
                    },
                    required: "name is required"
                  })} />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                  <input className="bg-[#fff] appearance-none  border-none w-full text-gray-700 mr-3 py-2 px-4  rounded-lg leading-tight focus:outline-none" placeholder='Roll No.' type='number' {...register("roll_no", {
                    required: true,
                    validate: validaterollNo,
                    minLength: {
                      value: 1,
                      message: "Roll No. must be at least 1 ",
                    },
                    maxLength: {
                      value: 4,
                      message: "Roll No. must not exceed 1500 ",
                    },
                  
                  })}
                  // onChange={handleChange}
                  />
                  {errors.roll_no && <p className="text-red-500">{errors.roll_no.message}</p>}

                  <input className="bg-[#fff] appearance-none  border-none w-full text-gray-700 mr-3 py-2 px-4  rounded-lg leading-tight focus:outline-none" placeholder='School' {...register("school", {
                    required: true,
                    minLength: {
                      value: 10,
                      message: "School must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "School must not exceed 100 characters",
                    },
                  
                  })} />
                  {errors.school && <p className="text-red-500">{errors.school.message}</p>}

                  <input className="bg-[#fff] appearance-none  border-none w-full text-gray-700 mr-3 py-2 px-4 rounded-lg leading-tight focus:outline-none" placeholder='Address' {...register("address", {
                    required: true,
                    minLength: {
                      value: 4,
                      message: "Address must be at least 10 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Address must not exceed 100 characters",
                    },
                   
                  })} />
                  {errors.address && <p className="text-red-500">{errors.address.message}</p>}


                  <input className='mx-auto bg-blue-400 font-medium rounded-xl my-3 py-2 px-6' type="submit" />
                  

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Form
