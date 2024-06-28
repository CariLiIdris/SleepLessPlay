import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './views/Home'
import { Navbar } from './components/Navbar'
import { UserForm } from './views/UserForm'
import { createUser, login, logout, updateUserByID } from './services/user.services'
import { LoginForm } from './views/LoginForm'
import { Dashboard } from './views/Dashboard'
import { ProfileForm } from './views/ProfileForm'
import { UserProfile } from './views/UserProfile'
import { Lounges } from './views/Lounges'
import { LoungeForm } from './views/LoungeForm'
import { createLounge, updateLoungeByID } from './services/lounge.services'
import { LoungeDisplay } from './views/LoungeDisplay'
import { Messages } from './components/Messages'
import { Games } from './views/Games'
import { GameForm } from './views/GameForm'

function App() {

  return (
    <>
      <Navbar submitFunction={logout} />

      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/signup'
          element={<UserForm
            submitFunction={createUser} />}
        />

        <Route
          path='/users/login'
          element={<LoginForm
            submitFunction={login}
          />} />

        <Route
          path='/dashboard'
          element={<Dashboard />}
        />

        <Route
          path='/user/:id/update'
          element={<ProfileForm
            submitFunction={updateUserByID} />}
        />

        <Route
          path='/user/:username'
          element={<UserProfile />}
        />

        <Route
          path='/lounges'
          element={<Lounges />}
        />

        <Route
          path='/lounge/create'
          element={<LoungeForm
            submitFunction={createLounge} />}
        />

        <Route
          path='/lounges/:id'
          element={<LoungeDisplay />}
        />

        <Route
          path='/lounge/:id/edit'
          element={<LoungeForm
            submitFunction={updateLoungeByID} />}
        />

        <Route
          path='/messages'
          element={<Messages />}
        />

        <Route
          path='/games'
          element={<Games />}
        />

        <Route
          path="/games/create"
          element={<GameForm />}
        />

        <Route
          path="/games/:id"
          element={<GameForm />}
        />
      </Routes>
    </>
  )
}

export default App
