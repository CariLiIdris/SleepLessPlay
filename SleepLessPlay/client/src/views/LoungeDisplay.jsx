/* eslint-disable no-unused-vars */
import { SocialBar } from "../components/SocialBar";
import { userContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteLoungeByID, getLoungeByID } from "../services/lounge.services";
import { joinLounge } from "../services/lounge.services";

export const LoungeDisplay = () => {
  const { id } = useParams();
  const { user, storeIdInLocalStorage } = useContext(userContext);
  const [lounge, setLounge] = useState({})

  const navigate = useNavigate();

  useEffect(() => {
    getLoungeByID(id)
      .then(res => setLounge(res))
      .catch(err => console.log(err))
  }, [id])

  const joinLoungeFunction = (loungeId) => {
    joinLounge(loungeId)
      .then(() => {
        navigate('/lounges')
      })
      .catch(err => console.log(err))
  }

  const deleteHandler = (loungeId) => {
    deleteLoungeByID(loungeId)
      .then(() => {
        navigate('/lounges')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      {lounge.name}
      {lounge.description}
      <button onClick={() => joinLoungeFunction(lounge._id)}>Join Lounge</button>
      {lounge.owner === user._id && (
        <button onClick={() => deleteHandler(lounge._id)} >Delete Lounge</button>
      )}
    </>
  )
}