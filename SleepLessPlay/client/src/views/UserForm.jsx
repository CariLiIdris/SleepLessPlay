/* eslint-disable no-unused-vars */
import { useState, useContext } from "react"
import {
    useNavigate
} from 'react-router-dom'
import { userContext } from "../context/userContext"

export const UserForm = ({ submitFunction }) => {
    const { setUser, storeIdInLocalStorage } = useContext(userContext)
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

    // Handle our submit
    const submitHandler = e => {
        e.preventDefault();

        submitFunction(userData)
            .then((res) => {
                navigate("/dashboard")
                setUser(res)
                console.log('userform``````` Res:', res)
                storeIdInLocalStorage(res.user._id)
            })
            .catch(error => {
                // console.log(error)
                // console.log('User error', error.response.data.errors)
                setUserErr(error.response.data.errors)
            })
    }

    // Validations for front-end
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    // Handle inputs and errors
    const updateUserData = e => {
        const { className, value } = e.target;
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
                errormsg = 'A password is required!';
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
        <div className="userFormContainer">
            <form className="userForm" onSubmit={submitHandler}>
                {/* Username Input */}
                <label>
                    Username:
                    {/* Backend Validations */}
                    <p> {userErr.username?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.username} </p>
                    <input
                        type="text"
                        className="username"
                        value={userData.username}
                        onChange={updateUserData}
                        placeholder="Enter your username"
                    />
                </label>

                {/* FName Input */}
                <label>
                    First Name:
                    {/* Backend Validations */}
                    <p> {userErr.fName?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.fName} </p>
                    <input
                        type="text"
                        className="fName"
                        value={userData.fName}
                        onChange={updateUserData}
                        placeholder="Enter your first name"
                    />
                </label>

                {/* LName Input */}
                <label>
                    Last Name:
                    {/* Backend Validations */}
                    <p> {userErr.lName?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.lName} </p>
                    <input
                        type="text"
                        className="lName"
                        value={userData.lName}
                        onChange={updateUserData}
                        placeholder="Enter your last name"
                    />
                </label>

                {/* Email Input */}
                <label>
                    Email:
                    {/* Backend Validations */}
                    <p> {userErr.email?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.email} </p>
                    <input
                        type="text"
                        className="email"
                        value={userData.email}
                        onChange={updateUserData}
                        placeholder="Enter your email"
                    />
                </label>

                {/* Password Input */}
                <label>
                    Password:
                    {/* Backend Validations */}
                    <p> {userErr.password?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.password} </p>
                    <input
                        type="password"
                        className="password"
                        value={userData.password}
                        onChange={updateUserData}
                        placeholder="Enter your password"
                    />
                </label>

                {/* Confirm Password */}
                <label>
                    Confirm Password:
                    {/* Backend Validations */}
                    <p> {userErr.confirmPassword?.message} </p>
                    {/* Frontend Validations */}
                    <p> {formErrors?.confirmPassword} </p>
                    <input
                        type="password"
                        className="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={updateUserData}
                        placeholder="Confirm your password"
                    />
                </label>

                {/* Submit Button  */}
                <button
                    type="submit"
                    className="submitBttn"
                    disabled={!validateForm()}
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}