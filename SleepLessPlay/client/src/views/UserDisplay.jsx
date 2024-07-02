import { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addFriend, getUserByUsername } from '../services/user.services';
import { userContext } from '../context/userContext';

export const UserDisplay = () => {
  const { username } = useParams();
  const { user } = useContext(userContext);
  const [profileUser, setProfileUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

  const navigate = useNavigate();

  // Fetch user by username in params
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserByUsername(username);
        setProfileUser(fetchedUser);

        // Check if the current user is already friends with the profile user
        if (user.friends?.includes(fetchedUser._id)) {
          setIsFriend(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [username, user.friends]);

  // Handle add friend
  const handleAddFriend = async () => {
    try {
      await addFriend(user._id, profileUser._id);
      setIsFriend(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user-profile">
      {/* Return home link */}
      <button className="home-button" onClick={() => navigate('/dashboard')}>Home</button>
      {/* If there is a user */}
      {profileUser ? (
        <>
          <h1>{profileUser.username}</h1>
          <p>First Name: {profileUser.fName}</p>
          <p>Last Name: {profileUser.lName}</p>
          <textarea value={profileUser.bio} readOnly />
          {!isFriend && (
            <button className="friend-button" onClick={handleAddFriend}>Add Friend</button>
          )}
          {isFriend && (
            <Link to={`/messages`}>
              <button className="message-button">Message</button>
            </Link>
          )}
        </>
      )
        // Else display a loading display
        : (
          <p>Loading...</p>
        )}
    </div>
  );
}