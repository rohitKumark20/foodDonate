import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import req from './req.module.css';

const API_URL = ''

const RequestForm = () => {
  const navigate = useNavigate();
  const [state,setState]=useState({name:'',quantity:'',quality:'',phone:'',Location:'',description:''});

  const onChangeValue = (e) => {
    setState({...state,[e.target.name]:e.target.value})
  } 

  const reqSubmit = async () => {
    const {name,quantity,quality,phone,Location,description} = state;

    if(!name || !quantity || !quality || !phone || !Location || !description){
      return alert('Please fill the data')
    }

    try {

      let token = localStorage.getItem('token')
      if(!token){
        navigate('/login')
        return alert("Login first")
      }
      const response = await fetch(`${API_URL}/postRequest`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          name,quantity,quality,phone,Location,description
        })
      })

      console.log(response);
      if(response.ok){
        alert('Request posted');
      }else{
        alert('Something went wrong')
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        <form className={req.formcontainer}>
        <div className={req.wrapper}>
          <fieldset>
            <legend>Request Form</legend>
            <div className={req.checkFood}>
              <div className={req.inputTag}>
                <label htmlFor="Organization">Name of the Organization</label>
                <input type="text" name="name" id='Organization'
                value={state.name}
                onChange={onChangeValue}
                />
              </div>


              <div className={req.inputTag}>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" name="quantity" id='quantity'
                value={state.quantity}
                onChange={onChangeValue}
                />
              </div>

              <div className={req.inputTag}>
                <label htmlFor="quality">Quality</label>
                <input type="text" name="quality" id='quality'
                value={state.quality}
                onChange={onChangeValue}
                />
              </div>


              <div className={req.inputTag}>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id='phone'
                value={state.phone}
                onChange={onChangeValue}
                />
              </div>

              <div className={`${req.inputTag} ${req.locationTag}`}>
                <label htmlFor="location">Location</label>
                <input type="text" name="Location" id='location'
                value={state.Location}
                onChange={onChangeValue}
                />
              </div>

            </div>

            <div className={req.inputTag}>
              <label htmlFor="description">Description</label>
              <textarea className={req.description} name="description" id='description' rows="5" cols="10"
              value={state.description}
              onChange={onChangeValue}
              ></textarea>
            </div>

            <button className={req.btns} type='button' onClick={reqSubmit}>Submit</button>
          </fieldset>
        </div>
      </form>
    </div>
  )
}

export default RequestForm