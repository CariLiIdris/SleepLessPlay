import settings from '../assets/images/settings.png'
import messages from '../assets/images/messages.png'
import trophy from '../assets/images/trophy.png'
import friends from '../assets/images/friends.png'
import profile from '../assets/images/profile.png'
import { Link } from "react-router-dom"
import { userContext } from "../context/userContext"
import { useContext, useEffect } from "react"

export const SocialBar = () => {
    const { user, setUser } = useContext(userContext)

    return(
        <>
        <div className="socialBarGroup">
            <p>Social</p>

            <div className="socialBarLinks">
                    <Link
                        to={'/'}
                        className="settingsLink socialBarLinks"
                    >
                        <img src={settings} alt="" />
                    </Link>
                    <Link
                        to={'/'}
                        className="messagesLink socialBarLinks"
                    >
                        <img src={messages} alt="" />
                    </Link>
                    <Link
                        to={'/'}
                        className="trophyLink socialBarLinks"
                    >
                        <img src={trophy} alt="" />
                    </Link>
                    <Link
                        to={'/'}
                        className="friendsLink socialBarLinks"
                    >
                        <img src={friends} alt="" />
                    </Link>
                    <Link
                        to={`/user/${user?._id}/update`}
                        className="profileLink socialBarLinks"
                    >
                        <img src={profile} alt="" />
                    </Link>
            </div>
        </div>
        </>
    )
}