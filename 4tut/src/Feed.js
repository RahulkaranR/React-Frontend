import React from 'react'
import Post from './Post'

const Feed = ({ post }) => {
  //console.log(post[0]);
  return (
    <>
       {post.map(posts => (
        <Post key={posts.id} posts={posts} /> 
       ))} 
    </>
  )
}

export default Feed