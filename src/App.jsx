// import './App.css'
import AllTodos from './Components/AllTodos';
import Home from './Components/Home'
import Form from './Components/Form';
import Todo from './Components/Todo';
import Login from './Components/login';

import {store} from './redux/store.js'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: '/alltodos',
        element: <AllTodos />
      },
      {
        path: '/todo/:id',
        element: <Todo />
      },
      {
        path: '/form',
        element: <Form />
      },
      {
        path: '/form/:id',
        element: <Form />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
]);

function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,

    </>
  )
}

export default App
