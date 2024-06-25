/* eslint-disable no-unused-vars */
import { SocialBar } from "../components/SocialBar";
import { userContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLoungeByMember, getAllLounges } from "../services/lounge.services";
import Cookies from 'js-cookie'
import { getUserByID } from "../services/user.services";

export const Lounges = () => {
  const { user, setUser, storeIdInLocalStorage } = useContext(userContext)
  const [allLounges, setAllLounges] = useState([])
  const [userLounges, setUserLounges] = useState([])
  const id = window.localStorage.getItem("Logged in user id");

  useEffect(() => {
    // getLoungeByMember(id)
    //   .then(res => {
    //     setUserLounges(res)
    //   })
    //   .catch(err => console.log(err))
    getAllLounges()
      .then(res => {
        setAllLounges(res)
        filterUserLounges(res, id)
        // console.log(res)
      })
      .catch(err => console.log(err))
  }, [id])

  const filterUserLounges = (lounges, userId) => {
    const filteredLounges = lounges.filter(lounge =>
      lounge.owner === userId ||
      lounge.coOwner === userId ||
      lounge.admins.includes(userId) ||
      lounge.members.includes(userId)
    );
    setUserLounges(filteredLounges);
  };

  return (
    <>
      <SocialBar />
      {user.username}

      <Link to={'/lounge/create'} > Create A Lounge </Link>

      <h1>Join The Discourse</h1>
      <form className="loungePostForm">
        <label>
          Begin Your Post
          <input className="loungePost" type="text" />
        </label>
        <label>
          Lounge
          <select className="postLocation">
            {userLounges?.map(lounge => (
              <option value={lounge._id} key={lounge._id}> {lounge.name} </option>
            ))}
          </select>
        </label>
      </form>
      <div className="loungeContent">
        <div className="loungeLeft">
          <p>Your Lounges</p>
          <div className="userLoungeContainer">
            {userLounges?.map(lounge => (
              <div key={lounge._id}>
                <h3>{lounge.name}</h3>
                <p>{lounge.description}</p>
                {lounge.owner === id && (
                  <Link to={`/lounge/${lounge._id}/edit`}> Edit </Link>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="loungeRight">
          <p>Discover</p>
          <div className="publicLoungeContainer">
            {allLounges.map(lounge => (
              <div key={lounge._id}>
                <h3>{lounge.name}</h3>
                <p>{lounge.description}</p>
                <Link to={`/lounges/${lounge._id}`}>See more...</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
