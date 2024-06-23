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

    useEffect(() => {
        getUserByID(id)
            .then((res) => {
                setUser(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <p>Welcome {user?.username} </p>
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
                            className="settingsLink"
                        >
                            <img src={settings} alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="messagesLink"
                        >
                            <img src={messages} alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="trophyLink"
                        >
                            <img src={trophy} alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="friendsLink"
                        >
                            <img src={friends} alt="" />
                        </Link>
                        <Link
                            to={`/user/${user?._id}/update`}
                            className="profileLink"
                        >
                            <img src={profile} alt="" />
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

                </div>
                <div className="dashLounges">

                </div>
            </div>
        </>
    )
}