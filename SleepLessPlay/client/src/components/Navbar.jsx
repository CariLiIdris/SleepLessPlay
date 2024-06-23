import { Link } from 'react-router-dom'
import logo from '../assets/images/SLPLOGO.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const Navbar = ({ submitFunction }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();
    
    const token = Cookies.get('userToken');
    useEffect(() => {
        console.log('Token from cookie:', token)
        if(token) {
            setIsLoggedIn(true)
        }
    }, [token]);

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
                <button type="submit">Search</button>
            </form>
            {/* Brand Logo */}
            <img 
            src={logo} 
            alt="SleepLessPlay Brand Logo" className='navLogo' 
            onClick={()=> navigate('/')}/>
            {/* Nav links */}
            <div className="actionLinks">
                {/* Button to direct to game page */}
                <button
                    className='navLink'
                >
                    <Link to={'/'}>Explore</Link>
                </button>
                {/* Button for users to logout or sign in */}
                {isLoggedIn ? (
                    <button className='navLink' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className='navLink'>
                        <Link to={'/users/login'}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    )
}