const express = require('express');
const twilio = require('twilio')
const router = express.Router();

const {register,login,postDonate,postReq,getDonation,getRequest} = require('../controller/auth.js')
const {authenticate} = require('../middleware/authenticate.js')

router.post('/register',register);
router.post('/login',login);
router.post('/postDonate',authenticate,postDonate);
router.post('/postRequest',authenticate,postReq);
router.get('/getDonations',getDonation);
router.get('/getRequests',getRequest);
router.post('/api/endpoint',authenticate, (req, res) => {
    const data = req.body;

    console.log(req.user);
    console.log('Ye details hai');
    const accountSid = 'AC5495a1f12b10fcc42b9db1deeb6337f2';
    const authToken = 'bc4e33e4843ba339fb10a03615b15a8b';

    const client = new twilio(accountSid, authToken);

    client.messages
        .create({
            body: `Hey ${data.name}!, You have a request regarding food donation from ${req.user.firstname} ${req.user.lastname}.You can contact on this ${req.user.phoneNo} for further details. Thank you!`,
            to: `+91${data.phone}`, // Text your number
            from: '+14302434695', // From a valid Twilio number
        })
        .then((message) => {
            console.log(message)
            res.status(200).json({ message: 'Sent successfully' })
        })
        .catch(err => {
            console.log(err)
            res.status(401).json({ message: 'Something went wrong' })
        });
})


module.exports = router