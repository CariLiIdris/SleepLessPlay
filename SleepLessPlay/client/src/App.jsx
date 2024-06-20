import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Navbar } from './components/Navbar'
import { UserForm } from './views/UserForm'
import { createUser } from './services/user.services'

function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/users/signup' element={<UserForm submitFunction={createUser} /> } />
      </Routes>
    </>
  )
}

export default App
