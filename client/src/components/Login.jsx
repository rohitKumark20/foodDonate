import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import LoginCSS from './Login.module.css'

const API_URL = ''

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({email:"",password:""});

    let name, value
    const handleInput = (e) =>{
        name = e.target.name;
        value= e.target.value;

        setUser({...user,[name]:value})
    }

    const loginUser = async () => {
        const {email,password} = user;
        console.log(email,password);

        if(!email || !password){
            return alert("Enter the credentials");
        }

        const response = await fetch(`${API_URL}/login`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        })

        const {token} = await response.json();

        if(response.status === 422 || !response){
            return alert("Something went wrong");
        }else{
            localStorage.setItem('token',token)
            alert('login Successful')
        }

        
        navigate('/')
    }

    return (
        <>
            <div className={LoginCSS.container}>

                <section className={LoginCSS.navigator}>
                    <img src="" alt="" />
                    <div className={LoginCSS.navList}>   
                        <ul>
                            <Link to='/'><li>Home</li></Link>
                            <Link to='/'><li>FAQs</li></Link>
                            <Link to='/'><li>Donate</li></Link>
                        </ul>
                    </div>
                    <div className={LoginCSS.right}>
                        <Link to='/register'><button className={LoginCSS.btn}>SignUp</button></Link>
                    </div>
                </section>

                <div className={LoginCSS.wrapper}>
                    <div className={LoginCSS.header}>
                        <h1>Login Here</h1>
                        <p>Welcome Back! please put you credentials below to start using the website.</p>
                    </div>

                    <div className={LoginCSS.credentials}>
                        <div className={LoginCSS.email}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input required type="text" id='email' name = 'email' placeholder='hello@example.com'
                                value={user.email}
                                onChange={handleInput}
                                />
                            </div>
                        </div>

                        <div className={LoginCSS.password}>
                            <div>
                                <label htmlFor="pass">Password</label>
                                <input required type="password" id='pass' name='password' placeholder='Enter your Password here' 
                                value={user.password}
                                onChange={handleInput}
                                />

                            </div>
                        </div>
                    </div>

                    <div className={LoginCSS.forgot}>
                        <Link to='#' className={LoginCSS.passLink}>Forgot password?</Link>
                    </div>

                    <hr />

                    <div className={LoginCSS.login}>
                        <button className={LoginCSS.btn} onClick={loginUser}>Log in</button>
                    </div>

                    <div className={LoginCSS.signUp}>
                        <p>Don't you have an account? <Link to="/register" className={LoginCSS.signLink}>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login