import React from 'react';
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  //console.log(posts.id);
  return (
    <article className='post' >
        <Link to={`post/${posts.id}`}>
            <h2 style={{ color: posts.titlecolor}} >{posts.title}</h2>
            <p className='PostDate'>{posts.datetime}</p>
        </Link>
        <p className='postBody'>{
          //posts.body
            (posts.body).length <= 25 
            ? posts.body 
            : `${(posts.body).slice(0, 25)}...` 
        }</p>
    </article>
  )
}

export default Post