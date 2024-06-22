import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Navbar } from './components/Navbar'
import { UserForm } from './views/UserForm'
import { createUser, login, logout} from './services/user.services'
import { LoginForm } from './views/LoginForm'
import { Dashboard } from './views/Dashboard'

function App() {

  return (
    <>
      <Navbar submitFunction={logout} />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/signup' element={<UserForm submitFunction={createUser} /> } />
        <Route path='/users/login' element={<LoginForm submitFunction={login} />} />
        <Route path='/dashboard' element={ <Dashboard /> } />
      </Routes>
    </>
  )
}

export default App
