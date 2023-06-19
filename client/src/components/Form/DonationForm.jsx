import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import don from './don.module.css'

const API_URL = ''

const DonationForm = () => {
  const Navigate = useNavigate();

  const [donate, setDonate] = useState({ name: '', quantity: '', quality: '', phone: '', Location: '',file:'', description: '' })

  let name, val;
  const handleInput = (e) => {
    name = e.target.name
    val = e.target.value
    setDonate({ ...donate, [name]: val });
  }

  const setImage = (e) => {
    setDonate({...donate,[e.target.name]:e.target.files[0]})
  }

  const postDonate = async (e) => {
    e.preventDefault();
    const { name, quantity, quality, phone, Location, description } = donate;
    // console.log(name,quantity)

    if(!name || !quantity || !quality || !phone || !Location || !description){
      alert('Please fill all the details');
      return
    }

    try {
      let token = localStorage.getItem('token')
      if(!token){
        Navigate('/login')
        return alert("Login first")
      }
      const response = await fetch(`${API_URL}/postDonate`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
          name, quantity, quality, phone, Location, description
        })
      })

      if(!response){
        alert('Error in submitting data: Busy server');
      }

      console.log(response)
      alert("Data posted");

    } catch (error) {
      console.log(error);
      alert("Something went wrong!")
    }

    setDonate({ name: '', quantity: '', quality: '', phone: '', Location: '', description: '' })
  }

  return (
    <div>
      <form className={don.formcontainer}>
        <div className={don.wrapper}>
          <fieldset>
            <legend>Donation Form</legend>
            <div className={don.checkFood}>
              <div className={don.inputTag}>
                <label htmlFor="Organization">Name of the Organization</label>
                <input type="text" name="name" id='Organization'
                  value={donate.name}
                  onChange={handleInput}
                />
              </div>


              <div className={don.inputTag}>
                <label htmlFor="quantity">Quantity</label>
                <input type="text" name="quantity" id='quantity'
                  value={donate.quantity}
                  onChange={handleInput}
                />
              </div>

              <div className={don.inputTag}>
                <label htmlFor="quality">Quality</label>
                <input type="text" name="quality" id='quality'
                  value={donate.quality}
                  onChange={handleInput}
                />
              </div>


              <div className={don.inputTag}>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id='phone'
                  value={donate.phone}
                  onChange={handleInput}
                />
              </div>

              <div className={`${don.inputTag} ${don.locationTag}`}>
                <label htmlFor="location">Location</label>
                <input type="text" name="Location" id='location'
                  value={donate.Location}
                  onChange={handleInput} />
              </div>
            </div>

            <div className={don.inputTag}>
              <label htmlFor="description">Description</label>
              <textarea className={don.description} name="description" id='description' rows="5" cols="10"
                value={donate.description}
                onChange={handleInput}
              />
            </div>

            <button className={don.btns} type='button' onClick={postDonate}>Submit</button>
          </fieldset>
        </div>
      </form>
    </div>
  )
}

export default DonationForm