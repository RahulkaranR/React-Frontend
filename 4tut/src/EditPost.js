import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import {format } from "date-fns";
import api from "./api/posts"


const Editpost = () => {
    const navigate = Navigate();
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const { post, setPost } = useContext(DataContext);
    const {id} = useParams();
    const poste = post.find(post => (post.id).toString() === id);

    const handleEdit = async (id) => {
        console.log("running of handle Edit", id);
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatedPost = {id, titlecolor: "red", title:editTitle, datetime, body: editBody}
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            console.log(response);
            setPost(post.map(post => post.id === id ? { ...response.data} : post));
            setEditTitle("");
            setEditBody("");
            navigate("/");
        } catch (err){
            console.log(`Error: ${err.message}`);
        }
    }

    useEffect(() => {
        if(poste){
            setEditBody(poste.body);
            setEditTitle(poste.title);
        }
    }, [poste, setEditTitle, setEditBody])

  return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h2>New Post</h2>
                <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                    type="text"
                    id='postTitle'
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                    id='postBody'
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type='submit' onClick={() => handleEdit(poste.id)}>Submit</button>
                </form>
            </>
            }
            {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                  <Link to={"/"}> Visit Our Homepage </Link>
                </p>
            </>
            }
        </main>
  )
}

export default Editpost