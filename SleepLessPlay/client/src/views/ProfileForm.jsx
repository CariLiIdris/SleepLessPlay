import { useEffect, useState, useContext } from "react"
import {
    useParams,
    useNavigate
} from 'react-router-dom'
import { getUserByID } from "../services/user.services"
import { userContext } from "../context/userContext"
import { Link } from "react-router-dom"

export const ProfileForm = ({ submitFunction }) => {
    const { id } = useParams()
    const { user, setUser, storeIdInLocalStorage } = useContext(userContext)
    // useState to for two way binding
    const [userData, setUserData] = useState({
        username: '',
        fName: '',
        lName: '',
        email: '',
        bio: '',
        userIcon: ''
    })

    // Server Errors
    const [userErr, setUserErr] = useState({})
    // Client Errors
    const [formErrors, setFormErrors] = useState({
        username: '',
        fName: '',
        lName: '',
        email: '',
        bio: ''
    })

    //Nav Shorthand
    const navigate = useNavigate();
    // When editing by ID, the form should autofill
    useEffect(() => {
        getUserByID(id)
            .then(res => {
                setUserData(res)
            })
    }, [id])

    // Handle our submit
    const submitHandler = e => {
        e.preventDefault();

        submitFunction(userData)
            .then((res) => {
                // console.log('PF Submit UserData: ', userData, 'Res: ', res )
                storeIdInLocalStorage(userData._id)
                setUser(res)
                navigate(`/user/${userData.username}`)
            })
            .catch(error => setUserErr(error.response.data))
    }

    // Validations for front-end
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const updateUserData = e => {
        const { className, value, files } = e.target;
        let errormsg = '';

        setUserData(prev => ({
            ...prev,
            [className]: files ? files[0] : value
        }
        ))

        if (className === 'username') {
            if (value.length === 0) {
                errormsg = 'A username is required!';
            } else if (value.length < 3) {
                errormsg = 'Username must be 3 or more characters!';
            } else if (value.length > 255) {
                errormsg = 'Username must not exceed 255 characters!'
            }
            setFormErrors(prev => ({ ...prev, username: errormsg }));
        }
        if (className === 'fName') {
            if (value.length === 0) {
                errormsg = 'A first name is required!';
            } else if (value.length < 2) {
                errormsg = 'First name must be 2 or more characters!';
            } else if (value.length > 255) {
                errormsg = 'First name must not exceed 255 characters!'
            }
            setFormErrors(prev => ({ ...prev, fName: errormsg }));
        }
        if (className === 'lName') {
            if (value.length === 0) {
                errormsg = 'A last name is required!';
            } else if (value.length < 2) {
                errormsg = 'Last name must be 2 or more characters!';
            } else if (value.length > 255) {
                errormsg = 'Last name must not exceed 255 characters!'
            }
            setFormErrors(prev => ({ ...prev, lName: errormsg }));
        }
        if (className === 'email') {
            if (value.length === 0) {
                errormsg = 'An email is required!';
            }
            setFormErrors(prev => ({ ...prev, email: errormsg }));
        }
        if (className === 'bio')
            if (value.length > 0) {
                if (value.length < 1) {
                    errormsg = 'A Bio must be 8 or more characters!';
                }
            }
        setFormErrors(prev => ({ ...prev, password: errormsg }));
    }

    return (
        <div className="profileFormContainer">
            <form className="profileForm" onSubmit={submitHandler}>
                {/* Profile Picture Input */}
                <label>
                    User Icon:
                    <input
                        type="file"
                        className="userIcon"
                        onChange={updateUserData}
                    />
                </label>
                {/* Username Input */}
                <label>
                    Username:
                    <input
                        type="text"
                        className="username"
                        value={userData.username}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.username} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.username} </p>
                {/* FName Input */}
                <label>
                    First Name:
                    <input
                        type="text"
                        className="fName"
                        value={userData.fName}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.fName} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.fName} </p>
                {/* LName Input */}
                <label>
                    Last Name:
                    <input
                        type="text"
                        className="lName"
                        value={userData.lName}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.lName} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.lName} </p>
                {/* Email Input */}
                <label>
                    Email:
                    <input
                        type="text"
                        className="email"
                        value={userData.email}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.email} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.email} </p>
                <label>
                    Bio:
                    <textarea
                        className="bio"
                        cols="30"
                        rows="5"
                        value={userData.bio}
                        onChange={updateUserData}
                    ></textarea>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="submitBttn"
                    disabled={!validateForm()}
                >
                    Edit
                </button>
                <Link to={`/user/${user.username}`} className="cancelLink"> Cancel </Link>
            </form>
        </div>
    )
}