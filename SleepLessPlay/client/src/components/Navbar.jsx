import { Link } from 'react-router-dom'
import logo from '../assets/images/SLPLOGO.png'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {

    const navigate = useNavigate();

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
                <button
                    className='navLink'
                >
                    <Link to={'/'}>Logout</Link>
                </button>
            </div>
        </div>
    )
}