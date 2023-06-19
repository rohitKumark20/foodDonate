import React from 'react'
import navCSS from './Navbar.module.css'
import {Link,useNavigate} from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    let token = localStorage.getItem('token');

    const userLogout = () => {
        if(!token){
            return alert('You are already logged out');
        }
        localStorage.removeItem('token');
        alert("Logged Out")
    }

    const userLogin = () => {
        
        if(token){
            return alert('You are already loggedIn')
        }

        navigate('/login')
    }

    return (
        <nav className={navCSS.navbar}>
            <div className={navCSS.navWrapper}>
                <div className="left"> <a href="/">Food Donation</a> </div>
                <div className={navCSS.navlist}>
                    <ul>
                        <Link to='/'><li>Home</li></Link>
                        <Link to='/donations'><li>Donors</li></Link>
                        <Link to='/request'><li>Requests</li></Link>
                        <Link to='/about'><li>About Us</li></Link>
                        <Link to='/contact'><li>Contact</li></Link>
                    </ul>
                </div>

                <div className="right">
                    <button className={navCSS.btn} onClick={userLogout} >Logout</button>
                    <button className={navCSS.btn} onClick={userLogin}>Login</button>
                    <Link to='/register'><button className={`${navCSS.btn}`}>Register</button></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar