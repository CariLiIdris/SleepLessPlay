/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import logo from '../assets/images/SLPLOGO.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import { userContext } from "../context/userContext"

// eslint-disable-next-line react/prop-types
export const Navbar = ({ submitFunction }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user, storeIdInLocalStorage } = useContext(userContext)

    const navigate = useNavigate();
    useEffect(() => {
        if (user._id) {
            setIsLoggedIn(true)
        }
    }, [user._id]);

    const handleLogout = () => {
        submitFunction()
            .then(() => {
                Cookies.remove('userToken');
                setIsLoggedIn(false);
                window.localStorage.removeItem('Logged in user id')
                navigate('/users/login');
            })
    };

    return (
        <div className="navbar">
            {/* Search form for searching games */}
            <form>
                <label className='searchLabel'>
                    Searchbar:
                    <input
                        type="text"
                        className="navSearch"
                    />
                </label>
                <button type="submit" className='searchBttn'>Search</button>
            </form>
            {/* Brand Logo */}
            <img
                src={logo}
                alt="SleepLessPlay Brand Logo" className='navLogo'
                onClick={() => {
                    isLoggedIn ? (
                        navigate('/dashboard')
                    )
                        : (
                            navigate('/')
                        )
                }} />
            {/* Nav links */}
            <div className="actionLinks">
                {/* Button to direct to game page */}
                <button
                    className='navLink exploreBttn'
                >
                    <Link to={'/'}>Explore</Link>
                </button>
                {/* Button for users to logout or sign in */}
                {isLoggedIn ? (
                    <button
                        className='navLink logoutBttn'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        className='navLink loginBttn'
                    >
                        <Link to={'/users/login'}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    )
}