import {
    useParams,
    useNavigate
} from 'react-router-dom'
import { userContext } from "../context/userContext"
import { useEffect, useState, useContext } from "react"
import { SocialBar } from '../components/SocialBar'
import { Link } from "react-router-dom"

export const UserProfile = () => {
    const { user, setUser, storeIdInLocalStorage } = useContext(userContext)
    const id = window.localStorage.getItem('Logged in user id')

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
                </div>
            </div>
        </>
    )
}