/* eslint-disable no-unused-vars */
import { PrettyChatWindow } from 'react-chat-engine-pretty'
import { userContext } from "../context/userContext"
import { useContext } from "react"

export const ChatsPage = (props) => {
  const { user, setUser } = useContext(userContext);

  return (
    <div className="chatContainer" style={{ height: '87vh' }}>
      <PrettyChatWindow
        projectId='db1e1dd4-2c32-4844-ad5c-ff517e8ce97a'
        username={user.username}
        secret={user._id}
        style={{ height: '100%' }}
      />
    </div>
  )
}