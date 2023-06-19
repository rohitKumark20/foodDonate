// import React, { useState } from 'react'
// import Navbar from '../Navbar'
// import con from './Contact.module.css'

// // import DonationForm from '../Form/DonationForm'

// const Contact = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Perform any necessary form validation here

//     // Reset the form after submission
//     setName('');
//     setEmail('');
//     setMessage('');
//   }
//   return (
//     <div>
//       <Navbar />

//       <div className={con.formsection}>
//         <h1>Contact Us</h1>
//         <form onSubmit={handleSubmit} className={con.wrapper}>
//           <label htmlFor="name">Name:</label><br/>
//           <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

//           <label htmlFor="email">Email:</label><br />
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

//           <label htmlFor="message">Message:</label><br />
//           <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="5" cols="45" required></textarea><br /><br />

//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     </div>

//   )
// }

// export default Contact;

import React, { useState } from 'react';
import Navbar from '../Navbar';
import concss from './Contact.module.css'

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={concss.formbody}>
      <Navbar />
      <div className={concss.contact_form_container}>
        <h1 className={concss.header}>Contact Form</h1>
        <form className={concss.contact_form} onSubmit={handleSubmit}>
          <div className={concss.form_group}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={concss.form_group}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={concss.form_group}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
