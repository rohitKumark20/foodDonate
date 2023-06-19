import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar'
import donCss from './Donation.module.css'
import Card from '../Card'

const API_URL = ''

const Donor = () => {

  const [data,setData] = useState([]);  

  const getData = async() => {
    const response = await fetch(`${API_URL}/getDonations`);
    const data = await response.json();

    const newData = data.sort(function(a,b){
      return new Date(b.date)-new Date(a.date);
    });

    setData(newData);
  }

  useEffect(() => {
    getData();
  
  }, [])
  

  return (
    <div>
      <Navbar />
      <div className={donCss.wrapper}>
        <section className={donCss.header}>
          <div className={donCss.message}>
            <h1>Food Donations</h1>
            <h3>"Thank you for choosing to make a difference through your donation."</h3>
            <p>That's wonderful to hear that you're ready to donate! Your decision to give back and make a positive impact is truly inspiring. Your generosity will not only benefit those in need but also contribute to creating a better world.</p>
          </div>
        </section>


        <section className={donCss.cards}>
          {
            data.map((currEle)=>{
              return (
                <div key={currEle._id}>

                <Card name={currEle.name} quantity={currEle.quantity} quality={currEle.quality} loc={currEle.Location} modType="Request" des={currEle.description} phon={currEle.phone} date ={currEle.date}/>
                </div>
              )
            })
          }
        </section>

        <section className={donCss.motivation}>
          <div>
            <h1>"With your support, you've brought the gift of a smile to someone who needed it most."</h1>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Donor