/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react"
import {
  useNavigate,
  useParams
} from 'react-router-dom'
import { userContext } from "../context/userContext"
import { getLoungeByID } from "../services/lounge.services";

// eslint-disable-next-line react/prop-types
export const LoungeForm = ({ submitFunction }) => {
  const { user, setUser, storeIdInLocalStorage } = useContext(userContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();


  const [loungeData, setLoungedata] = useState({
    name: '',
    description: ''
  })

  // Server Errors
  const [loungeErr, setLoungeErr] = useState({})
  // Client Errors
  const [formErrors, setFormErrors] = useState({
    name: 'A Lounge must have a Name!',
    description: 'Please give your lounge a description'
  })

  //Nav Shorthand
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
      setIsLoggedIn(true)
    }
  }, [user._id]);

  useEffect(() => {
    getLoungeByID(id)
      .then(res => {
        setLoungedata(res)
      })
  }, [id])

  // Handle our submit
  const submitHandler = e => {
    e.preventDefault();

    submitFunction(loungeData)
      .then((res) => {
        navigate("/lounges")
        setLoungedata(res)
        console.log('loungeform``````` Res:', res)
      })
      .catch(error => {
        console.log(error)
        setLoungeErr(error.response.data)
      })
  }

  // Validations for front-end
  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '')
  }

  const updateLoungeData = e => {
    const { className, value } = e.target;
    let errormsg = '';
    setLoungedata(prev => ({
      ...prev,
      [className]: value
    }
    ))

    if (className === 'name') {
      if (value.length === 0) {
        errormsg = 'A Lounge must have a Name!';
      } else if (value.length < 3) {
        errormsg = 'Lounge name must be 3 or more characters!';
      } else if (value.length > 255) {
        errormsg = 'Lounge name must not exceed 255 characters!'
      }
      setFormErrors(prev => ({ ...prev, name: errormsg }));
    }
    if (className === 'description') {
      if (value.length === 0) {
        errormsg = 'Please give your lounge a description!';
      } else if (value.length < 3) {
        errormsg = 'Description must be greater than 3 characters!';
      }
      setFormErrors(prev => ({ ...prev, description: errormsg }));
    }
  }

  return (
    <>
      Lounge Form
      {!isLoggedIn ? (
        <>
          <p>You must sign in to create a lounge!</p>
        </>
      ) : (<form onSubmit={submitHandler}>
        {/* Lounge Name */}
        <label>
          Lounge Name:
          <input
            type="text"
            className="name"
            value={loungeData.name}
            onChange={updateLoungeData}
          />
        </label>
        {/* Backend Validations */}
        <p> {loungeErr?.validationErrors?.name} </p>
        {/* Frontend Validations */}
        <p> {formErrors?.name} </p>
        {/* Lounge Description */}
        <label>
          Lounge Description:
          <textarea
            rows='8'
            cols='50'
            className="description"
            value={loungeData.description}
            onChange={updateLoungeData}
          ></textarea>
        </label>
        {/* Backend Validations */}
        <p> {loungeErr?.validationErrors?.description} </p>
        {/* Frontend Validations */}
        <p> {formErrors?.description} </p>
        {/* Submit Bttn */}
        <button
          type="submit"
          className="submitBttn"
          disabled={!validateForm()}
        >
          {!id ? (
            <>
              Create Lounge
            </>
          ) : (
            <>
              Update Lounge
            </>
          )}
        </button>
      </form>)}
    </>
  );
};
