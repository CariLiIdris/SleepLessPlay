import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Navbar } from './components/Navbar'
import { UserForm } from './views/UserForm'
import { createUser, login, logout, updateUserByID } from './services/user.services'
import { LoginForm } from './views/LoginForm'
import { Dashboard } from './views/Dashboard'
import { ProfileForm } from './views/ProfileForm'

function App() {

  return (
    <>
      <Navbar submitFunction={logout} />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signup' element={<UserForm submitFunction={createUser} /> } />
        <Route path='/users/login' element={<LoginForm submitFunction={login} />} />
        <Route path='/dashboard' element={ <Dashboard /> } />
        <Route path='/user/:id/update' element={<ProfileForm submitFunction={updateUserByID} /> } />
      </Routes>
    </>
  )
}

export default App
