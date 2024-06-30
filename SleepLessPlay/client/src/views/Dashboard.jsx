/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import followIcon from '../assets/images/followLinkIcon.png'
import settings from '../assets/images/settings.png'
import messages from '../assets/images/messages.png'
import trophy from '../assets/images/trophy.png'
import friends from '../assets/images/friends.png'
import profile from '../assets/images/profile.png'
import { userContext } from "../context/userContext"
import { useContext, useEffect, useState } from "react"
import { getUserByID } from "../services/user.services"
import { getAllGames } from "../services/game.services"
import { getAllLounges, joinLounge } from "../services/lounge.services"

export const Dashboard = () => {
    const { user, setUser } = useContext(userContext)
    const id = window.localStorage.getItem('Logged in user id')
    const [games, setGames] = useState([]);
    const [lounges, setLounges] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllGames()
            .then(setGames)
            .catch(console.log);
        getAllLounges()
            .then(setLounges)
            .catch(console.log);
    }, [id])

    const joinLoungeFunction = (loungeId) => {
        joinLounge(loungeId)
            .then(() => {
                navigate('/lounges')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {id ? (
                <>
                    <p className="userGreeting">Welcome {user?.username} </p>
                    <div className="upperDashContainer">
                        <div className="socials">
                            <div className="upperSocial">
                                <p>Socials</p>
                                <Link
                                    to={'/'}
                                    className="socialLink"
                                >
                                    <img src={followIcon} alt="Follow Link Icon" />
                                </Link>
                            </div>
                            <div className="lowerSocial">
                                <Link
                                    to={'/'}
                                    className="settingsLink dashSocialLink"
                                    data-tooltip="Settings (COMING SOON)"
                                >
                                    <img src={settings} alt="Settings" />
                                </Link>
                                <Link
                                    to={'/messages'}
                                    className="messagesLink dashSocialLink"
                                    data-tooltip="Messages"
                                >
                                    <img src={messages} alt="Messages" />
                                </Link>
                                <Link
                                    to={'/'}
                                    className="trophyLink dashSocialLink"
                                    data-tooltip="Trophies (COMING SOON)"
                                >
                                    <img src={trophy} alt="Trophies" />
                                </Link>
                                <Link
                                    to={'/friends'}
                                    className="friendsLink dashSocialLink"
                                    data-tooltip="Friends"
                                >
                                    <img src={friends} alt="Friends" />
                                </Link>
                                <Link
                                    to={`/user/${user?.username}`}
                                    className="profileLink dashSocialLink"
                                    data-tooltip="Profile"
                                >
                                    <img src={profile} alt="Profile" />
                                </Link>
                            </div>
                        </div>
                        <div className="news">
                            <p>News Coming Soon!!!!</p>
                        </div>
                        <div className="leaderboards">
                            <div className="upperLeaderboard">
                                <p>Leaderboards</p>
                                <Link
                                    to={'/'}
                                    className="leaderboardLink"
                                >
                                    <img src={followIcon} alt="Follow Link Icon" />
                                </Link>
                            </div>
                            <div className="lowerLeaderboard">
                                <p>Coming Soon!</p>
                            </div>
                        </div>
                    </div>
                    <div className="lowerDashContainer">
                        <div className="dashGames">
                            <p>Games</p>
                            <Link
                                to={'/games'}
                                className="gameLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>
                            <div className="gameList">
                                {games.map(game => (
                                    <div key={game._id} className="gameItem">
                                        <img src={game.iconUrl} alt="Game Icon" className="gameIcon" />
                                        <div className="gameDetails">
                                            <h2>{game.name}</h2>
                                            <p>{game.description}</p>
                                            <Link to={`/play/game/${game._id}`} className="playLink">PLAY</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="dashLounges">
                            <p>Lounges</p>
                            <Link
                                to={'/lounges'}
                                className="loungeLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>
                            <div className="loungeList">
                                {lounges.map(lounge => (
                                    <div key={lounge._id} className="loungeItem">
                                        <h2>{lounge.name}</h2>
                                        <div className="loungeActions">
                                            <Link to={`/lounges/${lounge._id}`} className="viewLink">View</Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> </>) : (
                <>
                    <p>Please sign up or log in to access this page!</p>
                </>
            )}
        </>
    )
}