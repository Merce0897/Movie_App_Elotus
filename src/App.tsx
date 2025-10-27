import { useState } from 'react'
import './App.css'
import { RouterProvider } from '@tanstack/react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
   <RouterProvider router={router} />;
  )
}

export default App
