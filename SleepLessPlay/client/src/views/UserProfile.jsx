/* eslint-disable no-unused-vars */
import {
    useNavigate
} from 'react-router-dom'
import { userContext } from "../context/userContext"
import { useContext } from "react"
import { SocialBar } from '../components/SocialBar'
import { Link } from "react-router-dom"
import { deleteUserByID } from '../services/user.services'
import Cookies from 'js-cookie'

export const UserProfile = () => {
    const { user, storeIdInLocalStorage } = useContext(userContext)
    const id = window.localStorage.getItem('Logged in user id')

    const navigate = useNavigate()

    const handleDelete = async (userId) => {
        deleteUserByID(userId)
            .then (() => {
                Cookies.remove('userToken');
                window.localStorage.removeItem('Logged in user id')
                navigate('/')
            })
            .catch(error => {
                console.log(error)
            })
}


return (
    <>
        <SocialBar />
        <div className="profileContent">
            <div className="leftSide">
                <p> {user.username} </p>
            </div>
            <div className="rightSide">
                <p>First Name: {user.fName} </p>
                <p>Last Name: {user.lName} </p>
                <p>Email: {user.email} </p>
                <Link to={`/user/${user._id}/update`}>Update Profile</Link>
                <button onClick={() => handleDelete(user._id) }>
                    Delete Profile
                </button>
            </div>
        </div>
    </>
)
}