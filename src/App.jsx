
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react'
import './App.css'

import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import TodoContainer from './components/TodoContainer';



function App() {
  const tableName=import.meta.env.VITE_TABLE_NAME;

  return (
    <Fragment>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/TodoContainer" element={ <TodoContainer tableName={tableName} /> }/>
          <Route path="/About" element={<About />} />
          <Route path="/Home"  element={<Home />}  />
          <Route path="/"  element={<Home />}  />
        </Routes> 
      </BrowserRouter>
      
    </Fragment>
  )
}

export default App
