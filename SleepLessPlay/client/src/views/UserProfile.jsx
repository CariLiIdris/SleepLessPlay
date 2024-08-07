/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import { userContext } from "../context/userContext"
import { useContext } from "react"
import { SocialBar } from '../components/SocialBar'
import { Link } from "react-router-dom"
import { deleteUserByID } from '../services/user.services'
import Cookies from 'js-cookie'
import editIcon from '../assets/images/edit.png'
import '../css/Userprofile.css'

export const UserProfile = () => {
    const { user } = useContext(userContext)

    const navigate = useNavigate()

    // Handle delete
    const handleDelete = async (userId) => {
        deleteUserByID(userId)
            .then(() => {
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
                    <div className="profileHeader">
                        <img src={user.avatar} alt="User Avatar" className="profileImage" />
                        <div className="userDetails">
                            <p className="username">{user.username}</p>
                            <p className="userRole">Titles coming soon</p>
                        </div>
                        {/* Edit profile link (will will edit image only) */}
                        <Link to={`/user/${user._id}/update`} className="editProfileLink">
                            <img src={editIcon} alt="Edit" />
                        </Link>
                    </div>

                    <div className="userBio">
                        {/* Bio */}
                        <p className="bioTitle">BIO:</p>
                        <textarea className="bioContent" value={user.bio} readOnly />
                    </div>
                </div>
                {/* Profile info display */}
                <div className="rightSide">
                    <p>First Name: <span className='profileData'>{user.fName}</span></p>
                    <p>Last Name: <span className='profileData'>{user.lName}</span></p>
                    <p>Email: <span className='profileData'>{user.email}</span></p>
                    <Link to={`/user/${user._id}/update`} className="updateProfileLink">Update Profile</Link>
                    <button onClick={() => handleDelete(user._id)} className="deleteProfileButton">
                        Delete Profile
                    </button>
                </div>
            </div>
        </>
    )
}