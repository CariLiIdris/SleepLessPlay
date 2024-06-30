/* eslint-disable no-unused-vars */
import { userContext } from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteLoungeByID, getLoungeByID } from "../services/lounge.services";
import { joinLounge } from "../services/lounge.services";
import { createPost, getAllPostsByLounge, updatePostByID, deletePostByID } from "../services/post.services";
import moment from 'moment'

export const LoungeDisplay = () => {
  const { id } = useParams();
  const { user, storeIdInLocalStorage } = useContext(userContext);
  const [lounge, setLounge] = useState({})
  const [posts, setPosts] = useState([])
  const [editPostData, setEditPostData] = useState({});
  const [isEditing, setIsEditing] = useState(null);

  const [postData, setPostData] = useState({
    lounge: '',
    content: ''
  })

  // Server Errors
  const [postErr, setPostErr] = useState({})
  // Client Errors
  const [formErrors, setFormErrors] = useState({
    lounge: 'A post must belong to a lounge!',
    content: 'A post must have content!'
  })

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getLoungeByID(id)
        .then(res => setLounge(res))
        .catch(err => console.log(err))

      getAllPostsByLounge(id)
        .then(res => setPosts(res))
        .catch(err => console.log(err))
    }
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

  const deletePostHandler = (postId) => {
    deletePostByID(postId)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
      })
      .catch(err => console.log(err));
  };

  const editPostHandler = (postId) => {
    setIsEditing(postId);
    const postToEdit = posts.find(post => post._id === postId);
    setEditPostData(postToEdit);
  };

  const updatePostDataHandler = e => {
    const { name, value } = e.target;
    setEditPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const saveEditPostHandler = e => {
    e.preventDefault();
    updatePostByID(isEditing, editPostData)
      .then(updatedPost => {
        setPosts(posts.map(post => post._id === isEditing ? updatedPost : post));
        setIsEditing(null);
        window.location.reload()
      })
      .catch(err => console.log(err));
  };

  const isUserMember = lounge.members?.includes(user._id);

  // Validations for front-end
  const validateForm = () => {
    return Object.values(formErrors).every(value => value === '')
  }

  const updatePostData = e => {
    const { className, value } = e.target;
    let errormsg = '';
    setPostData(prev => ({
      ...prev,
      [className]: value
    }
    ))

    if (className === 'lounge') {
      if (value.length === 0) {
        errormsg = 'A post must belong to a lounge!';
      }
      setFormErrors(prev => ({ ...prev, lounge: errormsg }));
    }
    if (className === 'content') {
      if (value.length === 0) {
        errormsg = 'A post must have content!';
      } else if (value.length < 1) {
        errormsg = 'A post must be 1 or more characters!';
      }
      setFormErrors(prev => ({ ...prev, content: errormsg }));
    }
  }

  // Submit Handler
  const submitHandler = e => {
    e.preventDefault();

    createPost(postData)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
        setPostErr(err.response.data)
      })
  }

  return (
    <>
      <div className="loungeDisplay">
        <Link to="/lounges" className="closeButton">X</Link>
        <div className="loungeInfo">
          <h2 className="loungeName">{lounge.name}</h2>
          <p className="loungeDescription">{lounge.description}</p>
          <div className="loungeActions">
            {(!isUserMember && lounge.owner?.username !== user.username) && (
              <button className="joinLoungeButton" onClick={() => joinLoungeFunction(lounge._id)}>Join Lounge</button>
            )}
            {lounge.owner?.username === user.username && (
              <button className="deleteLoungeButton" onClick={() => deleteHandler(lounge._id)}>Delete Lounge</button>
            )}
          </div>
          {(isUserMember || lounge.owner?.username === user.username) && (
            <form className="loungePostFormDisplay" onSubmit={submitHandler}>
              <label>
                Lounge
                <p> {postErr.validationErrors?.lounge} </p>
                <p> {formErrors?.lounge} </p>
                <select
                  className="lounge"
                  onChange={updatePostData}
                  value={postData.lounge}
                >
                  <option value="" disabled>Select a lounge</option>
                  <option
                    value={lounge._id}
                    key={lounge._id}
                  > {lounge.name} </option>
                </select>
              </label>
              <div>
                <label>
                  Begin Your Post
                  <p> {postErr.validationErrors?.content} </p>
                  <p> {formErrors?.content} </p>
                  <textarea
                    className="content"
                    cols="50"
                    rows="5"
                    onChange={updatePostData}
                    value={postData.content}
                  ></textarea>
                </label>
                <button
                  type="submit"
                  className="submitBttn"
                  disabled={!validateForm()}
                >
                  Post
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="loungePosts">
          {posts.map(post => (
            <div key={post._id} className="post">
              <p className="postAuthor">{post.author?.username}</p>
              {isEditing === post._id ? (
                <form onSubmit={saveEditPostHandler}>
                  <textarea
                    name="content"
                    value={editPostData.content}
                    onChange={updatePostDataHandler}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
                </form>
              ) : (
                <p className="postContent">
                  {post.content}
                  <span className="postTime">{moment(post.createdAt).fromNow()}</span>
                </p>
              )}
              {post.author.username === user.username && (
                <div className="postActions">
                  <button onClick={() => editPostHandler(post._id)} className="editBttn">Edit</button>
                  <button onClick={() => deletePostHandler(post._id)} className="deleteBttn">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}