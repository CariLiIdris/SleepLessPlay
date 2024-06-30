/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, searchUsers } from '../services/user.services';
import { userContext } from '../context/userContext';
import { debounce } from 'lodash';

export const Friends = () => {
  const { user } = useContext(userContext);
  const [friends, setFriends] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers()
        setSearchResults(users)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [user.friends]);

  const handleSearch = async (input) => {
    if (input.trim()) {
      const users = searchResults.filter(user => user.username.toLowerCase().includes(input.toLowerCase()))
      setSearchResults(users);
    } else {
      setSearchResults([]);
    }
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const handleInputChange = e => {
    const input = e.target.value;
    setSearchInput(input);
    debouncedSearch(input);
  };

  return (
    <div className="friendsPage">
      <h1 className="pageTitle">Your Friends</h1>
      <div className="friendsList">
        {friends.map((friend) => (
          <div key={friend._id} className="friendCard">
            <h2 className="friendName">{friend.username}</h2>
            <button
              className="messageButton"
              onClick={() => navigate(`/messages`)}
            >
              Message
            </button>
          </div>
        ))}
      </div>
      <div className="searchForm">
        <input
          type="text"
          className="searchInput"
          placeholder="Search for users..."
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="searchResults">
        {searchResults.map((result) => (
          <div key={result._id} className="searchResultCard">
            <h2 className="resultUsername">{result.username}</h2>
            <Link to={`/users/${result.username}`} className="viewProfileLink">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}