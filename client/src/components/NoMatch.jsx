import React from 'react'
import error from '../images/404Error.jpg'
import err from './NoMatch.module.css'

const NoMatch = () => {
  return (
    <div className={err.errorPage}>
        <img className = {err.imgSector}src={error} alt="404" />
        <div>
            <h1>Oh no! We couldn't find the page</h1>
        </div>
        
        <a href="/"><div className={err.homeButton}>
            <span>Go to Home page</span>
        </div></a>
    </div>
  )
}

export default NoMatch