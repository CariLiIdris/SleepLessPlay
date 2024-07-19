/* eslint-disable no-unused-vars */
import './App.css'
import {
  Route,
  Routes
} from 'react-router-dom'
import { Home } from './views/Home'
import { Navbar } from './components/Navbar'
import { UserForm } from './views/UserForm'
import {
  createUser,
  login,
  logout,
  updateUserByID
} from './services/user.services'
import { LoginForm } from './views/LoginForm'
import { Dashboard } from './views/Dashboard'
import { ProfileForm } from './views/ProfileForm'
import { UserProfile } from './views/UserProfile'
import { Lounges } from './views/Lounges'
import { LoungeForm } from './views/LoungeForm'
import {
  createLounge,
  updateLoungeByID
} from './services/lounge.services'
import { LoungeDisplay } from './views/LoungeDisplay'
import { Messages } from './components/Messages'
import { Games } from './views/Games'
import { GameForm } from './views/GameForm'
import { GameDisplay } from './views/GameDisplay'
import { UserDisplay } from './views/UserDisplay'
import { Friends } from './views/Friends'
import { NewsDisplay } from './views/NewsDisplay'
import { ProtectedRoutes } from './utils/ProtectedRoutes'

function App() {

  return (
    <>
      {/* Navbar */}
      <Navbar submitFunction={logout} />

      {/* Home */}
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        {/* Sign up */}
        <Route
          path='/signup'
          element={<UserForm
            submitFunction={createUser} />}
        />

        {/* Login */}
        <Route
          path='/users/login'
          element={<LoginForm
            submitFunction={login}
          />} />

        {/* Open source games */}
        <Route
          path='/games'
          element={<Games />}
        />

        {/* Create games (currectly private) */}
        <Route
          path="/games/create"
          element={<GameForm />}
        />

        {/* Games display */}
        <Route
          path="/games/:id"
          element={<GameForm />}
        />

        {/* Play game display */}
        <Route
          path="/play/game/:id"
          element={<GameDisplay />}
        />

        {/* news */}
        <Route
          path='/news'
          element={<NewsDisplay />}
        />

        {/* Protected Routes HERE */}
        <Route element={<ProtectedRoutes />}>

          {/* Dashboard */}
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />

          {/* Update user */}
          <Route
            path='/user/:id/update'
            element={<ProfileForm
              submitFunction={updateUserByID} />}
          />

          {/* User profile */}
          <Route
            path='/user/:username'
            element={<UserProfile />}
          />

          {/* Lounges */}
          <Route
            path='/lounges'
            element={<Lounges />}
          />

          {/* Create lounge */}
          <Route
            path='/lounge/create'
            element={<LoungeForm
              submitFunction={createLounge} />}
          />

          {/* lounge display */}
          <Route
            path='/lounges/:id'
            element={<LoungeDisplay />}
          />

          {/* Edit lounge */}
          <Route
            path='/lounge/:id/edit'
            element={<LoungeForm
              submitFunction={updateLoungeByID} />}
          />

          {/* Messages (chat engine.io) */}
          <Route
            path='/messages'
            element={<Messages />}
          />
        </Route>

      </Routes>
    </>
  )
}

export default App
