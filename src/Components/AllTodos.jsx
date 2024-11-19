import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
// import dotenv from 'dotenv'

import { useSelector, useDispatch } from 'react-redux'


const AllTodos = () => {

  // dotenv.config()

  const verifyUser = useSelector((state) => state.verifyUser)
  const apiData = import.meta.env.VITE_MONGODB

  const { id } = useParams();
  const [todos , setTodos] = useState([]);
  const [searchData, setSearchData] = useState('');
  // console.log(searchData, 'searchdata')
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(5); // Set limit to 5 todos per page
  const navigate = useNavigate();

  // to check user login or logout
  useEffect(() => {
    verifyUser ? '' : navigate('./login')
  }, [])


  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const totalPages = Math.ceil(todos.length / todosPerPage);
  let searchingData = [];

  const searchValuesData = todos.filter(e => e.name.includes(searchData) || e.roll_No.toString().includes(searchData) || e.school.includes(searchData) || e.address.includes(searchData));


  
  const handleDelete = async (item) => {
    console.log('handleDelete is clicked')
    console.log(item)
    await axios.delete(`${apiData}/${item._id}`);
    setTodos(todos.filter(todo => todo._id !== item._id));
    if (currentTodos.length === 0 && currentPage === totalPages) {
      handlePrevious();
    }
    console.log(todos.length);
  };

  const handleEdit = (item) => {
    navigate(`/form/${item._id}`);
    setTimeout(() => {
      // handleDelete(item)
    }, 2000);
  };

  const handleChange = async (e) => {
    const data = e.target.value
    console.log(data)
    setSearchData(data);
    // await Search(data);
  };

//   async function fetchData() {
//     try {
//         const response = await axios.get(apiData);
//         console.log('Response data:', response.data);
//     } catch (error) {
//         console.error('Error fetching data:', error.message);

//     }
// }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handledetail = (e) => {
    console.log(e._id)
    navigate(`/todo/${e._id}`);

  }

  // console.log(currentTodos.length)
  useEffect(() => {
    const getData = async () => {
      const fetchData = await axios.get(apiData);
      // console.log(fetchData.data)
      const data = fetchData.data
      // console.log(apiData)
      setTodos(data);
    }
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const fetchData = await axios.get(apiData);
      // setTodos(fetchData.data);
      console.log(fetchData.data)
      setTodos(fetchData.data);
    }
    getData();
    // fetchData()
  }, []);


  return (
    <>
      <div className="flex m-4 justify-between w-[95vw]">
        <h2 className='font-medium text-xl'>All Todos</h2>
        <div className="flex gap-4">
          <input
            onChange={handleChange}
            className='rounded-xl px-3 py-1 outline-none'
            placeholder='Search'
            type="text"
            name='Name'
            value={searchData}
          />

        </div>
      </div>

      <div className="m-5 w-[95vw]">
        {searchValuesData.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="pl-2 border text-start">Sr. no.</th>
                <th className="py-2 px-4 border text-start">Name</th>
                <th className="py-2 px-4 border text-start">Roll No.</th>
                <th className="py-2 px-4 border text-start">School</th>
                <th className="py-2 px-4 border text-start">Address</th>
                <th className="py-2 px-4 border text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchValuesData.slice(indexOfFirstTodo, indexOfLastTodo).map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2 pl-5 font-medium border-r">{indexOfFirstTodo + index + 1}</td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.roll_no}</td>
                  <td className="py-2 px-4">{item.school}</td>
                  <td className="py-2 px-4">{item.address}</td>
                  <td className="py-2 px-2 flex gap-5">
                    <button
                      onClick={() => handleEdit(item)}
                      className='bg-red-600 text-white py-1 px-3 rounded-xl'>
                      Edit
                    </button>
                    <button
                      onClick={() => handledetail(item)}
                      className='bg-green-600 text-white py-1 px-3 rounded-xl'>
                      Details
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className='bg-blue-500 text-white py-1 px-3 rounded-xl'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>

      {/* Pagination Controls */}

      {searchValuesData.length >= 5 || currentPage > 1 ? (
        <div className="flex justify-center space-x-2 mt-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="bg-blue-300 rounded-xl px-4 py-2 font-bold">
            Previous
          </button>
          <p className='px-4 py-2 font-bold'>{currentPage} / {totalPages}</p>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="bg-blue-300 rounded-xl px-4 py-2 font-bold">
            Next
          </button>
        </div>) : ''}
    </>
  );
}

export default AllTodos;
