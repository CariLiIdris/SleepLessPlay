import { useState, useContext } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/userContext"
import { Link } from "react-router-dom"

export const LoginForm = ({ submitFunction }) => {
    const { user, setUser, storeIdInLocalStorage } = useContext(userContext)
    const [activeUserData, setActiveUserData] = useState({
        username: '',
        password: ''
    })
    // Server Errors
    const [activeUserErr, setActiveUserErr] = useState({})
    // Client Errors
    const [formErrors, setFormErrors] = useState({
        username: 'A Username is required!',
        password: 'A password is required!'
    })

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        
        submitFunction(activeUserData)
        .then((res) => {
            console.log(res)
            setUser(res)
            storeIdInLocalStorage(res._id)
            navigate('/dashboard')
        })
        // .then(console.log(activeUserData))
        .catch(error => setActiveUserErr(error.response.data))
    }

    // Validations for front-end
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const updateActiveUserData = e => {
        const { className, value } = e.target;
        let errormsg = '';
        setActiveUserData(prev => ({
            ...prev,
            [className]: value
        }
        ))

        if (className === 'username') {
            if (value.length === 0) {
                errormsg = 'An email or username is required!';
            } else if (value.length < 3) {
                errormsg = 'This field must be 3 or more characters!';
            } else if (value.length > 255) {
                errormsg = 'This field must not exceed 255 characters!'
            }
            setFormErrors(prev => ({ ...prev, username: errormsg }));
        }
        if (className === 'password') {
            if (value.length === 0) {
                errormsg = 'A password is required!';
            } else if (value.length < 8) {
                errormsg = 'Password must be 8 or more characters!';
            }
            setFormErrors(prev => ({ ...prev, password: errormsg }));
        }
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                {/* User input */}
                <p>{ activeUserErr.validationErrors?.msg }</p>
                <label>
                    Username:
                    <input
                        type="text"
                        className="username"
                        value={activeUserData.username}
                        onChange={updateActiveUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {activeUserErr.validationErrors?.username} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.username} </p>
                <label>
                    {/* Password Input */}
                    <input
                        type="password"
                        className="password"
                        value={activeUserData.password}
                        onChange={updateActiveUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {activeUserErr.validationErrors?.password} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.password} </p>
                <button
                    type="submit"
                    className="submitBttn"
                    disabled={!validateForm()}
                >
                    Login
                </button>
                <Link to={'/signup'} >Don't have an account? Sign Up!</Link>
            </form>
        </>
    )
}