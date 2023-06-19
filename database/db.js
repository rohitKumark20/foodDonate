const mongoose = require('mongoose');

const username = process.env.USERNAME
const password = process.env.PASSWORD

const Connection = async() =>{
    try {
        const res = await mongoose.connect(`mongodb+srv://user:FoodDonationuser@cluster0.sxcyq4q.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser:true,useUnifiedTopology: true});
        console.log("Succesfull Connection")
    } catch (error) {
        console.log("Error while connecting the database",error)
    }
}

module.exports = Connection