import React from 'react'
import Header from '../../components/Header.tsx'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="error-page">
      <Header />


      <div className="error-container">
        <h1>Error 404! Uh Oh!</h1>
        <p>Hey! You have reached an unexpected page. Click on this link to navigate back to out home page and we will see you there.</p>
        <Link to="/">Home Page</Link>
      </div>
    </div>
  )
}

export default Error