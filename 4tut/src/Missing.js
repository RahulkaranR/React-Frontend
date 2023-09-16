import React from 'react';
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main className='Miaaing'>
        <h2>Page Not Found</h2>
        <p>Well, that's disappointing.</p>
        <p>
          <Link to="/">Visit our HomePage</Link>
        </p>
    </main>
  )
}

export default Missing