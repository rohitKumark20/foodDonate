import React, { useState } from 'react'
import registerCSS from './Register.module.css'
import { Link,useNavigate } from 'react-router-dom'

const url = ""
const Register = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNo: "",
    password: "",
    cpassword: ""
  });


  let name, val

  const handleInput = (e) => {
    name = e.target.name;
    val = e.target.value;

    setUser({ ...user, [name]: val });
  }

  const registerUser = async (e) => {
    e.preventDefault()
    const { firstname, lastname, email, phoneNo, password, cpassword } = user;

    if (password !== cpassword) {
      return alert("password doesn't match");
    }

    try {
      const response = await fetch(`${url}/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname, lastname, email, phoneNo, password, cpassword
        })
      })

      if(response.status === 422 || !response){
        return alert("user already exist")
      }

      console.log(response);

      alert("Successful")
      navigate('/login')
    } catch (error) {
      console.log({message:error})
    }
  }

  return (
    <>
      <div className={registerCSS.container}>

        <section className={registerCSS.navigator}>
          <img src="" alt="" />
          <div className={registerCSS.navList}>
            <ul>
              <Link to='/'><li>Home</li></Link>
              <li>FAQs</li>
              <li>Donate</li>
            </ul>
          </div>
          <div className={registerCSS.right}>
            <Link to='/login'><button className={registerCSS.btn}>Login</button></Link>
          </div>
        </section>



        <div className={registerCSS.registerWrapper}>
          <div className={registerCSS.credentials}>

            <h1>Regiser Here</h1>

            <p>Fill the credentials to get yourself registered</p>
            <div className={registerCSS.Form}>
              <div className={registerCSS.firstName}>
                <input type="text" name='firstname' placeholder='First Name'
                  value={user.firstname}
                  onChange={handleInput}
                />
              </div>

              <div className={registerCSS.lastName}>
                <input type="text" name='lastname' placeholder='Last Name'
                  value={user.lastname}
                  onChange={handleInput}
                />
              </div>

              <div className={registerCSS.yourEmail}>
                <input type="text" name='email' placeholder='Email'
                  value={user.email}
                  onChange={handleInput}
                />
              </div>

              <div className={registerCSS.Phone}>
                <input type="tel" name='phoneNo' placeholder='Phone No'
                  value={user.phoneNo}
                  onChange={handleInput}
                />
              </div>

              <div className={registerCSS.createPass}>
                <input type="Password" name='password' placeholder='Create password (Atleast 8 characters)'
                  value={user.password}
                  onChange={handleInput}
                />
              </div>

              <div className={registerCSS.confirmPass}>
                <input type="Password" name='cpassword' placeholder='Confirm password'
                  value={user.cpassword}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className={registerCSS.register}>
              <button className={registerCSS.btn} onClick={registerUser}>Register</button>
            </div>

            <div className={registerCSS.Login}>
              <p>Already have an account?<Link to="/login" className={registerCSS.linkLogin}> Log in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register