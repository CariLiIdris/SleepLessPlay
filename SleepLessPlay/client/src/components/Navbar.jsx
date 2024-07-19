/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import logo from '../assets/images/SLPLOGO.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect, useState, useContext } from 'react'
import { userContext } from "../context/userContext"
import { getAllGames } from '../services/game.services'
import { getAllLounges } from '../services/lounge.services'
import { getAllUsers } from '../services/user.services'
import { debounce } from 'lodash'
import '../css/Navbar.css'

// eslint-disable-next-line react/prop-types
export const Navbar = ({ submitFunction }) => {
    // Const Declarations
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { user } = useContext(userContext)
    const [searchInput, setSearchInput] = useState('')
    const [searchResults, setSearchResults] = useState({ games: [], lounges: [], users: [] })
    const [allData, setAllData] = useState({ games: [], lounges: [], users: [] })
    const [dropdownVisible, setDropdownVisible] = useState(false)

    const navigate = useNavigate();

    // Chech if the user is signed in 
    useEffect(() => {
        if (user._id) {
            setIsLoggedIn(true)
        }
    }, [user._id])

    // Fetch data for search bar
    useEffect(() => {
        const fetchData = async () => {
            try {
                const games = await getAllGames()
                const lounges = await getAllLounges()
                const users = await getAllUsers()
                setAllData({ games, lounges, users })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const handleLogout = () => {
        submitFunction()
            .then(() => {
                Cookies.remove('userToken')
                setIsLoggedIn(false)
                window.localStorage.removeItem('Logged in user id')
                navigate('/users/login')
            })
    }

    const handleSearch = query => {
        if (query.trim()) {
            const games = allData.games.filter(game => game.name.toLowerCase().includes(query.toLowerCase()))

            const lounges = allData.lounges.filter(lounge => lounge.name.toLowerCase().includes(query.toLowerCase()))

            const users = allData.users.filter(user => user.username.toLowerCase().includes(query.toLowerCase()))

            setSearchResults({ games, lounges, users });
            setDropdownVisible(true);
        }
        else {
            setSearchResults({ games: [], lounges: [], users: [] })
            setDropdownVisible(false);
        }
    }

    const debouncedSearch = debounce(handleSearch, 300)

    const handleInputChange = e => {
        const query = e.target.value
        setSearchInput(query)
        debouncedSearch(query)
    }

    return (
        <div className="navbar">
            <form onSubmit={e => e.preventDefault()}>
                <label className='searchLabel'>
                    Search:
                    <input
                        type="text"
                        className="navSearch"
                        value={searchInput}
                        onChange={handleInputChange}
                    />
                </label>
                {dropdownVisible && (
                    <div className="dropdown">
                        <div className="dropdown-category">
                            <h4>Games</h4>
                            {searchResults.games.length ? (
                                searchResults.games.map(game => (
                                    <Link key={game._id} to={`/play/game/${game._id}`} onClick={() => setDropdownVisible(false)}>
                                        {game.name}
                                    </Link>
                                ))
                            ) : (
                                <p>No games found</p>
                            )}
                        </div>
                        <div className="dropdown-category">
                            <h4>Lounges</h4>
                            {searchResults.lounges.length ? (
                                searchResults.lounges.map(lounge => (
                                    <Link key={lounge._id} to={`/lounges/${lounge._id}`} onClick={() => setDropdownVisible(false)}>
                                        {lounge.name}
                                    </Link>
                                ))
                            ) : (
                                <p>No lounges found</p>
                            )}
                        </div>
                        <div className="dropdown-category">
                            <h4>Users</h4>
                            {searchResults.users.length ? (
                                searchResults.users.map(user => (
                                    <Link key={user._id} to={`/users/username/${user.username}`} onClick={() => setDropdownVisible(false)}>
                                        {user.username}
                                    </Link>
                                ))
                            ) : (
                                <p>No users found</p>
                            )}
                        </div>
                    </div>
                )}
            </form>
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
            <div className="actionLinks">
                <button className='navLink exploreBttn'>
                    <Link to={'/games'}>Explore</Link>
                </button>
                {isLoggedIn ? (
                    <button className='navLink logoutBttn' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className='navLink loginBttn'>
                        <Link to={'/users/login'}>Login</Link>
                    </button>
                )}
            </div>
        </div>
    )
}