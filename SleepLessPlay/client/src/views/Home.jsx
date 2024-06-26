/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getUserByID } from "../services/user.services"

export const Home = () => {

    return (
        <>
            <div className="ctaSignUp">
                <h1>Ready To Give Your Brain a SleepLess Break?</h1>
                <button>
                    <Link to={'/signup'} >Sign Up & Get Started</Link>
                </button>
            </div>
        </>
    )
}