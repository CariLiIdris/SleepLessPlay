import { Link } from "react-router-dom"

export const Dashboard = () => {

    return (
        <>
            <div className="upperDashContainer">
                <div className="socials">
                    <div className="upperSocial">
                        <p>Socials</p>
                        <Link 
                            to={'/'}
                            className="socialLink"
                        >
                            <img src="" alt="" />
                        </Link>
                    </div>
                    <div className="lowerSocial">
                        <Link
                            to={'/'}
                            className="settingsLink"
                        >
                            <img src="" alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="messagesLink"
                        >
                            <img src="" alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="trophyLink"
                        >
                            <img src="" alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="friendsLink"
                        >
                            <img src="" alt="" />
                        </Link>
                        <Link
                            to={'/'}
                            className="profileLink"
                        >
                            <img src="" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="news">

                </div>
                <div className="leaderboards">

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