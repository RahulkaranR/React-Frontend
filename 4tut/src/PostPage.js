import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from "./api/posts"


const PostPage = () => {
  const {post, setPost } = useContext(DataContext);
  const navigate = Navigate();
  
  const { id } = useParams();
  const poste = post.find(post => (post.id).toString() === id);

  const handleDelete = async (id) => {
    try{
    await api.delete(`/posts/${id}`);
    const postList = post.filter(poste => poste.id !== id);
    setPost(postList);
    navigate("/");
    } catch(err){
    console.log(`Error: ${err.message}`);
    }
}

  return (
    <main className='PostPage'>
        <article className='post'>
          {poste?
            (<>
              <h2>{poste.title}</h2>
              <p className='postDate'>{poste.datetime}</p>
              <p className='postBody'>{poste.body}</p>
              <Link to={`/edit/${poste.id}`}><button className='editButton'> Edit Post </button></Link>
              <button onClick={() => handleDelete(poste.id)}>Delete</button>
            </>)
            : ( <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing</p>
              <p>
                <Link to={"/"}> Visit Our Homepage </Link>
              </p>
            </>)
          }
        </article>
    </main>
  )
}

export default PostPage