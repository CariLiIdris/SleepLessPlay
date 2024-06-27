/* eslint-disable no-unused-vars */
import { userContext } from "../context/userContext"
import { useContext } from "react"

import { AuthPage } from '../views/AuthPage'
import { ChatsPage } from '../views/ChatsPage'

export const Messages = () => {
  const { user, setUser } = useContext(userContext);

  if (!user.username) {
    return (
      <>
        <AuthPage onAuth={(user) => setUser(user)} />
      </>
    );
  }
  else {
    return (
      <>
        <ChatsPage user={user} />
      </>
    )
  }
}