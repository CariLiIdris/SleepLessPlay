/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react"
import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'
import { userContext } from "../context/userContext"
import { getLoungeByID } from "../services/lounge.services";

// eslint-disable-next-line react/prop-types
export const LoungeForm = ({ submitFunction }) => {
  const { user } = useContext(userContext)
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

  // If a user is signed in set logged in to true
  useEffect(() => {
    if (user._id) {
      setIsLoggedIn(true)
    }
  }, [user._id]);

  // Get lounge by id
  useEffect(() => {
    if (id) (
      getLoungeByID(id)
        .then(res => {
          setLoungedata(res)
          setFormErrors({
            name: '',
            description: ''
          })
        })
    )
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

  // handle inputs and errors
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
      <div className="loungeFormContainer">
        <form onSubmit={submitHandler} className="loungeForm">
          {/* Name input */}
          <label>
            Lounge Name:
            <p className="error">{loungeErr?.validationErrors?.name}</p>
            <p className="error">{formErrors?.name}</p>
            <input
              type="text"
              className="name"
              value={loungeData.name}
              onChange={updateLoungeData}
            />
          </label>

          {/* Description input */}
          <label>
            Lounge Description:
            <p className="error">{loungeErr?.validationErrors?.description}</p>
            <p className="error">{formErrors?.description}</p>
            <textarea
              rows="8"
              cols="50"
              className="description"
              value={loungeData.description}
              onChange={updateLoungeData}
            ></textarea>
          </label>

          {/* Submit bttn */}
          <button
            type="submit"
            className="submitBttn"
            disabled={!validateForm()}
          >
            {id ? 'Update Lounge' : 'Create Lounge'}
          </button>
          {/* Cancel link */}
          <Link to="/lounges" className="cancelLink">Cancel</Link>
        </form>
      </div>
    </>
  );
};
