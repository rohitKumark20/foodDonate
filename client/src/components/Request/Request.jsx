import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Card from '../Card'
import req from './Request.module.css'

const API_URL = ''

const Request = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetch(`${API_URL}/getRequests`);
        const data = await response.json();

        const newData = data.sort(function(a,b){
            return new Date(b.date)-new Date(a.date);
          });

        setData(newData);
        // console.log(data);
    }

    useEffect(() => {
        getData();

    }, [])

    return (
        <div>
            <Navbar />
            <div className={req.wrapper}>
                <section className={req.header}>
                    <div className={req.message}>
                        <h1>Food Requests</h1>
                        <h3>"Thank you for choosing to make a difference through your donation."</h3>
                        <p>That's wonderful to hear that you're ready to donate! Your decision to give back and make a positive impact is truly inspiring. Your generosity will not only benefit those in need but also contribute to creating a better world.</p>
                    </div>
                </section>


                <section className={req.cards}>
                    {
                        data.map((currEle) => {
                            return (
                                <div key={currEle._id}>
                                    <Card name={currEle.name} quantity={currEle.quantity} quality={currEle.quality} loc={currEle.Location} modType="Donate" des={currEle.description} phon={currEle.phone} date={currEle.date}/>
                                </div>
                            )
                        })
                    }
                </section>

                <section className={req.motivation}>
                    <div>
                        <h1>"With your support, you've brought the gift of a smile to someone who needed it most."</h1>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Request