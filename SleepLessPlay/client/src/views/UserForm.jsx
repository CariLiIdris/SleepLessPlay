import { useEffect, useState } from "react"
import {
    useParams,
    useNavigate
} from 'react-router-dom'
import { getUserByID } from "../services/user.services"

export const UserForm = ({ submitFunction }) => {
    const { id } = useParams()
    // useState to for two way binding
    const [userData, setUserData] = useState({
        username: '',
        fName: '',
        lName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // Server Errors
    const [userErr, setUserErr] = useState({})
    // Client Errors
    const [formErrors, setFormErrors] = useState({
        username: 'A username is required!',
        fName: 'A first name is required!',
        lName: 'A last name is required!',
        email: 'An email is required!',
        password: 'A password is required!',
        confirmPassword: 'Passwords must match!'
    })

    //Nav Shorthand
    const navigate = useNavigate();
    // When editing, the form should autofill
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
            .then(() => navigate("/"))
            .catch(error => setUserErr(error.response.data))
    }

    // Validations for front-end
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const updateUserData = e => {
        const { className, value, type } = e.target;
        let errormsg = '';
        setUserData(prev => ({
            ...prev,
            [className]: value
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
        if (className === 'password') {
            if (value.length === 0) {
                errormsg = 'A first name is required!';
            } else if (value.length < 8) {
                errormsg = 'Password must be 8 or more characters!';
            }
            setFormErrors(prev => ({ ...prev, password: errormsg }));
        }
        if (className === 'confirmPassword') {
            if (value.length === 0) {
                errormsg = 'Please confirm password!';
            } else if (value !== userData.password) {
                errormsg = 'Passwords must match!';
            }
            setFormErrors(prev => ({ ...prev, confirmPassword: errormsg }));
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
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
                {/* Password Input */}
                <label>
                    Password:
                    <input
                        type="password"
                        className="password"
                        value={userData.password}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.password} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.password} </p>
                {/* Confirm Password */}
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        className="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={updateUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {userErr.validationErrors?.confirmPassword} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.confirmPassword} </p>
                {/* Submit Button  */}
                <button
                    type="submit"
                    className="submitBttn"
                    disabled={!validateForm()}
                >
                    Sign Up
                </button>
            </form>
        </>
    )
}