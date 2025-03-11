const express = require("express");
const app = express();
require("dotenv").config()
const mongoose = require("mongoose")

app.use(express.json());




//  docker file is getting pushed , configuration is done in gitub workflow
app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: 'server is up and  running '
		})
})

const dbConnect = require("./config/database");
dbConnect()

const userRoutes = require("./routes/userRoutes");
app.use("/api/v1/users", userRoutes)

app.use((error, req, res, next) => {
	console.log(error)
	const statusCode = error.statuscode || 500;
	return res.status(statusCode)
		.json({
			success: false,
			message: error.message || "Internal error occured"
		})
})

const PORT = process.env.PORT || 4001;
const server = app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})


process.on("SIGINT", () => {
	server.close((error) => {
		if (error) {
			console.log("error occured while shutting down the server : ")
			process.exit(1)
		}

		console.log("server is closed down : ")

		mongoose.connection.close(false)
			.then((data) => {
				console.log("mongoose connection is closed succesfully")
				process.exit(0)
			})
			.catch((error) => {
				console.log("error occured  while closing the database")
				process.exit(1)
			})

	})
})