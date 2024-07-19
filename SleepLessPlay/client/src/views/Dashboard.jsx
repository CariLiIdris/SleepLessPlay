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
import { getAllGames } from "../services/game.services"
import { getAllLounges } from "../services/lounge.services"
import axios from "axios"
import '../css/Dashboard.css'

export const Dashboard = () => {
    const { user } = useContext(userContext)
    const id = window.localStorage.getItem('Logged in user id')
    const [games, setGames] = useState([]);
    const [lounges, setLounges] = useState([]);
    const [news, setNews] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const navigate = useNavigate();

    // Get all games and lounges
    useEffect(() => {
        getAllGames()
            .then(setGames)
            .catch(console.log);
        getAllLounges()
            .then(setLounges)
            .catch(console.log);
    }, [id])

    // Get gaming news
    useEffect(() => {
        axios.get('http://localhost:8002/news')
            .then((res) => {
                setNews(res.data.slice(0, 3));
            })
            .catch((error) => {
                console.error("Error fetching news", error);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % news.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [news]);

    // const joinLoungeFunction = (loungeId) => {
    //     joinLounge(loungeId)
    //         .then(() => {
    //             navigate('/lounges')
    //         })
    //         .catch(err => console.log(err))
    // }

    return (
        <>
            {/* If the user is signed in display normal page */}
            {id ? (
                <>
                    <p className="userGreeting">Welcome {user?.username} </p>

                    <div className="upperDashContainer">
                        <div className="socials">
                            <div className="upperSocial">

                                {/* Social Link */}
                                <p>Socials</p>
                                <Link
                                    to={'/'}
                                    className="socialLink"
                                >
                                    <img src={followIcon} alt="Follow Link Icon" />
                                </Link>
                            </div>

                            <div className="lowerSocial">
                                {/* Settings link */}
                                <Link
                                    to={'/'}
                                    className="settingsLink dashSocialLink"
                                    data-tooltip="Settings (COMING SOON)"
                                >
                                    <img src={settings} alt="Settings" />
                                </Link>
                                {/* Messages link */}
                                <Link
                                    to={'/messages'}
                                    className="messagesLink dashSocialLink"
                                    data-tooltip="Messages"
                                >
                                    <img src={messages} alt="Messages" />
                                </Link>
                                {/* Trophy link */}
                                <Link
                                    to={'/'}
                                    className="trophyLink dashSocialLink"
                                    data-tooltip="Trophies (COMING SOON)"
                                >
                                    <img src={trophy} alt="Trophies" />
                                </Link>
                                {/* Friend link */}
                                <Link
                                    to={'/friends'}
                                    className="friendsLink dashSocialLink"
                                    data-tooltip="Friends"
                                >
                                    <img src={friends} alt="Friends" />
                                </Link>
                                {/* Profile link */}
                                <Link
                                    to={`/user/${user?.username}`}
                                    className="profileLink dashSocialLink"
                                    data-tooltip="Profile"
                                >
                                    <img src={profile} alt="Profile" />
                                </Link>
                            </div>
                        </div>

                        <div className="newsCarousel">
                            {news.map((item, index) => (
                                <div className={`newsItem ${index === activeIndex ? 'active' : ''}`} key={item.id}>
                                    <img src={item.thumbnail} alt={item.title} />
                                    <div className="newsContent">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <Link to="/news" className="newsBttn">View All</Link> | <Link to={`/news-page/${item.id}`} className="newsBttn">See More</Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="leaderboards">
                            <div className="upperLeaderboard">
                                <p>Leaderboards</p>
                                {/* Leaderboard link */}
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
                            {/* Games link */}
                            <Link
                                to={'/games'}
                                className="gameLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>
                            {/* Games list */}
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
                            {/* Lounges link */}
                            <Link
                                to={'/lounges'}
                                className="loungeLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>

                            <div className="loungeList">
                                {/* Lounges list */}
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
                        {/* If the user is not signed in prompt them to do so */}
                    </div> </>) : (
                <>
                    <p>Please sign up or log in to access this page!</p>
                </>
            )}
        </>
    )
}