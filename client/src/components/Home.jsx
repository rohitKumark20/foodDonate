import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import Navbar from './Navbar'
import HomeCSS from './Home.module.css'

import DonationForm from './Form/DonationForm'
import RequestForm from './Form/RequestForm'

const API_URL = ''
const Home = () => {

  const [donations, setDonations] = useState([]);
  const [request, setRequest] = useState([]);

  const getData = async () => {
    const response = await fetch(`${API_URL}/getDonations`);
    const data = await response.json();

    const newData = data.sort(function(a,b){
      return new Date(b.date)-new Date(a.date);
    });

    setDonations(newData);
  }

  const getRequestData = async () => {
    const response = await fetch(`${API_URL}/getRequests`);
    const data = await response.json();

    const newData = data.sort(function(a,b){
      return new Date(b.date)-new Date(a.date);
    });

    setRequest(newData);
  }

  useEffect(() => {
    getData();
    getRequestData();

  }, [])

  return (
    <>
      <Navbar />
      <section className={HomeCSS.banner}>
        <div className={HomeCSS.bannerWrap}>
          <div className={HomeCSS.forms}>
            <DonationForm />
            <RequestForm />
          </div>
        </div>
      </section>

      <section className={HomeCSS.donationList}>
        <header>
          <h1>Donation Lists</h1>
        </header>
        <div className={HomeCSS.lists}>
          {
            donations.map((currEle,index)=>{
              if(index<4){
                return(
                
                  <div  key={currEle._id}>
                  <Card name={currEle.name} quantity={currEle.quantity} quality={currEle.quality} loc={currEle.Location} modType="Request" des={currEle.description} phon={currEle.phone} date ={currEle.date}/>
                  </div>
  
                )
              }

            })
          }
        </div>

        <a href="/donations"><button className={HomeCSS.btn}>Show More Donations</button></a>
      </section>

      <section className={HomeCSS.donationList}>
        <header>
          <h1>Food Requests Lists</h1>
        </header>
        <div className={HomeCSS.lists}>
          {
            request.map((currEle,index)=>{
              if(index<4){
                return(
                
                  <div key={currEle._id}>
                  <Card name={currEle.name} quantity={currEle.quantity} quality={currEle.quality} loc={currEle.Location} modType="Donate" des={currEle.description} phon={currEle.phone} date ={currEle.date}/>
                  </div>
                  
                )
              }

            })
          }
        </div>

        <a href="/request"><button className={HomeCSS.btn}>Show More Requests</button></a>
      </section>

      {/* <footer>
        <Footer />
      </footer> */}

    </>
  )
}

export default Home