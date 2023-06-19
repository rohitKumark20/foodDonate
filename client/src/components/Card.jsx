import React,{useState} from 'react'
import CardCSS from './Card.module.css'
import Modal from './Modal/Modal'
import food  from '../images/donation.jpg'

const Card = (props) => {
  const [modal, setModal] = useState(false);

  const closeModal = () => setModal(false);

  return (
    <div className={CardCSS.cardContainer}>
        <div className={CardCSS.info}>
          <img className = {CardCSS.imgSection} src={food} alt="food" />
          <h3 className={CardCSS.orgName}>{props.name}</h3>
          <div className={CardCSS.quantity}>
            <h3 className={CardCSS.headName}>Quantity</h3>
            <div>{props.quantity}</div>
          </div>
          <div>{props.quality}</div>

          <div className={CardCSS.location}>
            <h3 className={CardCSS.headName}>Location</h3>
            <div>{props.loc}</div>
          </div>

          <hr />

          <div className={CardCSS.details} onClick={()=>setModal(true)}>
            {/* {props.date} */}
            Know More ➡️
          </div>

          {modal && <Modal close = {closeModal} n={props.name} quantity={props.quantity} quality={props.quality} loc={props.loc} dat = {props.date} modtype={props.modType} descr = {props.des} ph={props.phon}/>}
          
        </div>
    </div>
  )
}

export default Card