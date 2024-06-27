/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import followIcon from '../assets/images/followLinkIcon.png'
import settings from '../assets/images/settings.png'
import messages from '../assets/images/messages.png'
import trophy from '../assets/images/trophy.png'
import friends from '../assets/images/friends.png'
import profile from '../assets/images/profile.png'
import { userContext } from "../context/userContext"
import { useContext, useEffect } from "react"
import { getUserByID } from "../services/user.services"

export const Dashboard = () => {
    const { user, setUser } = useContext(userContext)
    const id = window.localStorage.getItem('Logged in user id')

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
                                    to={'/'}
                                    className="friendsLink dashSocialLink"
                                    data-tooltip="Friends (COMING SOON)"
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
                                to={'/'}
                                className="gameLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>
                        </div>
                        <div className="dashLounges">
                            <p>Lounges</p>
                            <Link
                                to={'/lounges'}
                                className="loungeLink"
                            >
                                <img src={followIcon} alt="Follow Link Icon" />
                            </Link>
                        </div>
                    </div> </>) : (
                <>
                    <p>Please sign up or log in to access this page!</p>
                </>
            )}
        </>
    )
}