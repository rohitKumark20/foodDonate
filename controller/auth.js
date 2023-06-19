const bcrypt = require('bcryptjs')
require('../database/db.js')
const { User, Donate, request } = require('../database/model/model.js')


const register = async (req, res) => {
    try {
        const { firstname, lastname, email, phoneNo, password, cpassword } = req.body;

        if (!firstname || !lastname || !email || !phoneNo || !password || !cpassword) {
            return res.status(422).json({ error: "Fill the data properly" })
        }

        const user = await User.findOne({ email: email })

        if (user) {
            return res.status(422).json({ Error: "User already exist" });
        }

        const newUser = new User({ firstname, lastname, email, phoneNo, password, cpassword })
        await newUser.save();
        console.log({ firstname, lastname, email, phoneNo, password, cpassword });
        res.status(200).json({ message: "Succesfull" })

    } catch (error) {
        res.status(400).json({ message: error });
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin)

    if (!userLogin) {
        res.status(422).json({ message: "Error" });
        return;
    }

    // console.log(password,userLogin.password);
    const isMatch = await bcrypt.compare(password, userLogin.password);

    const token = await userLogin.generateAuthToken();
    
    if (isMatch) {
        res.status(200).json({ message: "Login Successful",token:token });
    } else {
        res.status(422).json({ message: "Error" });
    }
}

const postDonate = async (req, res) => {
    const data = req.body;
    // console.log(data);

    if (!data) {
        res.status(422).json({ message: 'Data is missing' });
        return;
    }

    // console.log(req.cookies)

    try {
        const newDonation = new Donate(data);
        const response = await newDonation.save();

        res.status(200).json({ message: 'Data saved successfully' });
        // console.log(response);
    } catch (error) {
        res.status(422).json({ message: 'Error while posting' })
    }
}

const getDonation = async (req, res) => {
    try {
        const data = await Donate.find();
        res.send(data);
    } catch (error) {
        res.status(422).json({ message: "Error while getting data" });
    }
}

const postReq = async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const newRequest = await request(data);
        const resp = await newRequest.save();
        console.log(resp);
        res.status(200).json({ message: 'Request posted successfully' })
    } catch (error) {
        res.status(422).json({ message: 'Error while posting request' });
    }
}

const getRequest = async (req, res) => {
    try {
        const data = await request.find();
        res.send(data);
    } catch (error) {
        res.status(422).json({ message: "Error while getting data" });
    }
}

module.exports = { register, login, postDonate, postReq, getDonation, getRequest }