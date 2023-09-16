import React from 'react'
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Home = () => {
  const { searchResults, fetchError, isLoading } = useContext(DataContext);
  
  return (
    <main className='Home'>
        {isLoading && <p className='statusMsg'>Loading post ...</p>}
        {fetchError && !isLoading && <p className='statusMsg' style={{color: "red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchResults.length? <Feed post={searchResults} /> : <p className='statusMsg'>No post to Display.</p>)}
    </main>
  )
}

export default Home