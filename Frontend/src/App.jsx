import React from 'react'
import AppBar from './Components/AppBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Course from './Components/Course'

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Routes>
        <Route path='/' element={<div>All home contents</div>} />
        <Route path='/courses' element={<Course />} />
        <Route path='*' element={<div>Error 404 page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App