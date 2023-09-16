import React from 'react'
import { useContext, useState } from 'react'
import DataContext from './context/DataContext'
import { Navigate } from "react-router-dom"
import { format } from "date-fns";
import api from "./api/posts"

const NewPost = () => {
  const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const navigate = Navigate();

    const { post, setPost} = useContext(DataContext);

    const handleSubmit = async (e) => {
      console.log("this is great");
      e.preventDefault();
      const colours = ["red", "yellow", "green", "violet", "orange", "blue", "skyblue", "black"]
      const rand = Math.floor(Math.random() * 8);
      const titlecolor = colours[rand];
      console.log(titlecolor, rand);
      const id = post.length ? Number(post[post.length -1].id) + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyyy pp");
      const newPost = {id, titlecolor, title:postTitle, datetime, body: postBody}
      try{
      const response = await api.post("/posts", newPost);
      const allPost = [...post, response.data];
      setPost(allPost);
      setPostTitle("");
      setPostBody("");
      navigate("/");
      } catch(err){
      console.log(`Error: ${err.message}`)
      }
  }

  
  return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
              <label htmlFor="postTitle">Title:</label>
              <input 
                type="text"
                id='postTitle'
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
              <label htmlFor="postBody">Post:</label>
              <textarea 
                id='postBody'
                required
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
        </main>
  )
}

export default NewPost