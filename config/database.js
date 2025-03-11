const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = () => {
	mongoose.connect(process.env.DATABASE_URL)
		.then((data) => {
			console.log("connection is established at : ", data.connection.host)
		})
		.catch((error) => {
			console.log("error occured while connecting to  DB")
		})
}

module.exports = dbConnect