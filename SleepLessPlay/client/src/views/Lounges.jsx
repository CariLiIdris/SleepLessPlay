/* eslint-disable no-unused-vars */
import { SocialBar } from "../components/SocialBar";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoungeByMember, getAllLounges } from "../services/lounge.services";
import { createPost, getAllPostsByLounge, updatePostByID } from "../services/post.services";

export const Lounges = () => {
  const [allLounges, setAllLounges] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [userLounges, setUserLounges] = useState([])
  const id = window.localStorage.getItem("Logged in user id");

  //Nav Shorthand
  const navigate = useNavigate();

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

  const filterUserLounges = (lounges, userId) => {
    const filteredLounges = lounges.filter(lounge =>
      lounge.owner === userId ||
      lounge.coOwner === userId ||
      lounge.admins.includes(userId) ||
      lounge.members.includes(userId)
    );
    setUserLounges(filteredLounges);
  };

  const getPostsForUserLounges = lounges => {
    const postsPromises = lounges.map(lounge => {
      return getAllPostsByLounge(lounge._id)
        .then(posts => ({
          loungeId: lounge._id,
          posts: posts
        }))
    })

    Promise.all(postsPromises)
      .then(res => {
        const postsData = {};
        res.forEach(res => {
          postsData[res.loungeId] = res.posts
        })
        setAllPosts(postsData)
      })
      .catch(err => console.log(err))
  }

  // *Lounge Use Effect
  useEffect(() => {
    getAllLounges()
      .then(res => {
        setAllLounges(res)
        filterUserLounges(res, id)
        // console.log(res)
      })
      .catch(err => console.log(err))
  }, [id])

  // *Posts UseEffect
  useEffect(() => {
    if (userLounges.length > 0) {
      getPostsForUserLounges(userLounges)
    }
  }, [userLounges])

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

  return (
    <>
      <SocialBar />
      <div className="loungeContainer">
        <Link to={'/lounge/create'} className="createLoungeButton">Create A Lounge</Link>

        <h1 className="pageTitle">Join The Discourse</h1>
        <form className="loungePostForm" onSubmit={submitHandler}>
          <label>
            Lounge
            <select
              className="lounge"
              onChange={updatePostData}
              value={postData.lounge}
            >
              <option value="" disabled>Select a lounge</option>
              {userLounges?.map(lounge => (
                <option
                  value={lounge._id}
                  key={lounge._id}
                > {lounge.name} </option>
              ))}
            </select>
          </label>
          {/* Backend Validations */}
          <p> {postErr.validationErrors?.lounge} </p>
          {/* Frontend Validations */}
          <p> {formErrors?.lounge} </p>
          <div>
            <label>
              Begin Your Post
              <textarea
                className="content"
                cols="50"
                rows="5"
                onChange={updatePostData}
                value={postData.content}
              ></textarea>
            </label>
            {/* Backend Validations */}
            <p> {postErr.validationErrors?.content} </p>
            {/* Frontend Validations */}
            <p> {formErrors?.content} </p>
            <button
              type="submit"
              className="submitBttn"
              disabled={!validateForm()}
            >
              Post
            </button>
          </div>
        </form>
        <div className="loungeContent">
          <div className="loungeLeft">
            <p className="sectionTitle">Your Lounges</p>
            <div className="userLoungeContainer">
              {userLounges?.map(lounge => (
                <div key={lounge._id} className="loungeCard">
                  <h3 className="loungeCardTitle"><Link to={`/lounges/${lounge._id}`}>{lounge.name}</Link></h3>
                  <p className="loungeCardDescription">{lounge.description}</p>
                  {lounge.owner === id && (
                    <Link to={`/lounge/${lounge._id}/edit`} className="editLink">Edit</Link>
                  )}
                  <div className="posts">
                    {allPosts[lounge._id]?.map(post => (
                      <div key={post._id} className="postCard">
                        <p className="postTitle">{post.title}</p>
                        <p className="postContent">{post.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="loungeRight">
            <p className="sectionTitle">Discover</p>
            <div className="publicLoungeContainer">
              {allLounges.map(lounge => (
                <div key={lounge._id} className="loungeCard">
                  <h3 className="loungeCardTitle">{lounge.name}</h3>
                  <p className="loungeCardDescription">{lounge.description}</p>
                  <Link to={`/lounges/${lounge._id}`} className="seeMoreLink">See more...</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
