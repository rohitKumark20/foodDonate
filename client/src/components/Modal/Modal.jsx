import React from 'react'
import mod from './Modal.module.css'
import shishu from '../../images/donation.jpg'

const API_URL = ''

const Modal = (props) => {
    // const param = props.modtype

    let token = localStorage.getItem('token')
    const handleClick = async() => {
        fetch(`${API_URL}/api/endpoint`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                name:props.n, phone:props.ph, type:props.modtype
            })
        })
        .then(response => {
            if(response.status === 401){
                alert('LogIn required')
            }else if(response.ok){
                alert(`${props.modtype} made successfully!`)
            }

        })
        .catch(err => {
            alert('Something went wrong')
        })
    }
    
    return (
        <div>
            <div className={mod.main}>
                <div className={mod.container}>
                    <span onClick={props.close}>x</span>
                    <div className={mod.top}>
                        <div className={mod.modalContent}>
                            <div className={mod.left}>
                                <img src={shishu} alt="" />
                                <div className={mod.orgName}>
                                    <h3>{props.n}</h3>
                                </div>

                                <div className={mod.dateTime}>
                                    <p>{new Date(props.dat).toLocaleString()}</p>
                                </div>

                                <div className={mod.qualinity}>
                                    <div>{props.quantity}</div>
                                    <div>{props.quality}</div>
                                </div>
                                <div className={mod.location}>
                                    {props.loc}
                                </div>
                            </div>
                            <div className={mod.right}>
                                <div className={mod.info}>
                                    <div>
                                        <h3>Name of the Organization</h3>
                                        <p>{props.n}</p>
                                    </div>

                                    <div className={mod.contactDetails}>
                                        <h3>Phone No.</h3>
                                        <p>{props.ph}</p>

                                        {/* <h3>Email</h3>
                                        <p>abc@example.com</p> */}
                                    </div>

                                    <div className={mod.description}>
                                        <h3>Description</h3>
                                        <p>{props.descr}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={mod.bottom} onClick={handleClick}>
                        <h3>{props.modtype}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal