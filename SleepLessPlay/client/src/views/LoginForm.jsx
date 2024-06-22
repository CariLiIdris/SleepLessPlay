import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const LoginForm = ({ submitFunction }) => {
    const [activeUserData, setActiveUserData] = useState({
        emailOrUsername: '',
        password: ''
    })
    // Server Errors
    const [activeUserErr, setActiveUserErr] = useState({})
    // Client Errors
    const [formErrors, setFormErrors] = useState({
        emailOrUsername: 'An email or Username is required!',
        password: 'A password is required!'
    })

    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        
        submitFunction(activeUserData)
        .then(() => navigate('/dashboard'))
        // .then(console.log(activeUserData))
        .catch(error => setActiveUserErr(error.response.data))
    }

    // Validations for front-end
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const updateActiveUserData = e => {
        const { className, value, type } = e.target;
        let errormsg = '';
        setActiveUserData(prev => ({
            ...prev,
            [className]: value
        }
        ))

        if (className === 'emailOrUsername') {
            if (value.length === 0) {
                errormsg = 'An email or username is required!';
            } else if (value.length < 3) {
                errormsg = 'This field must be 3 or more characters!';
            } else if (value.length > 255) {
                errormsg = 'This field must not exceed 255 characters!'
            }
            setFormErrors(prev => ({ ...prev, emailOrUsername: errormsg }));
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
                {/* Email or User input */}
                <p>{ activeUserErr.validationErrors?.msg }</p>
                <label>
                    Email or Username:
                    <input
                        type="text"
                        className="emailOrUsername"
                        value={activeUserData.emailOrUsername}
                        onChange={updateActiveUserData}
                    />
                </label>
                {/* Backend Validations */}
                <p> {activeUserErr.validationErrors?.emailOrUsername} </p>
                {/* Frontend Validations */}
                <p> {formErrors?.emailOrUsername} </p>
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
            </form>
        </>
    )
}