import settings from '../assets/images/settings.png'
import messages from '../assets/images/messages.png'
import trophy from '../assets/images/trophy.png'
import friends from '../assets/images/friends.png'
import profile from '../assets/images/profile.png'
import { Link } from "react-router-dom"
import { userContext } from "../context/userContext"
import { useContext } from "react"

export const SocialBar = () => {
    const { user } = useContext(userContext)

    return (
        <div className="socialBarGroup">
            <p className="socialHead">SOCIALS</p>
            <div className="socialBarLinks">
                <Link
                    to={'/'}
                    className="settingsLink socialIconLink"
                    data-tooltip="Settings (COMING SOON)"
                >
                    <img src={settings} alt="Settings Icon" />
                </Link>
                <Link
                    to={'/messages'}
                    className="messagesLink socialIconLink"
                    data-tooltip="Messages"
                >
                    <img src={messages} alt="Messages Icon" />
                </Link>
                <Link
                    to={'/'}
                    className="trophyLink socialIconLink"
                    data-tooltip="Trophies (COMING SOON)"
                >
                    <img src={trophy} alt="Trophy Icon" />
                </Link>
                <Link
                    to={'/friends'}
                    className="friendsLink socialIconLink"
                    data-tooltip="Friends"
                >
                    <img src={friends} alt="Friends Icon" />
                </Link>
                <Link
                    to={`/user/${user?.username}`}
                    className="profileLink socialIconLink"
                    data-tooltip="Profile"
                >
                    <img src={profile} alt="Profile Icon" />
                </Link>
            </div>
        </div>
    )
}