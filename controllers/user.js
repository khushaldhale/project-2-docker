const userSchema = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");



exports.createUser = asyncHandler(async (req, res, next) => {

	const { fname, lname, email, password } = req.body;

	if (!fname || !lname || !email || !password) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const is_existing = await userSchema.findOne({ email });

	if (is_existing) {
		return next(new ErrorHandler(400, "you are already registered, kindly login"))
	}

	const response = await userSchema.create({ fname, lname, email, password });

	return res.status(200)
		.json({
			success: true,
			message: "user is registered succesfully",
			data: response
		})


})

exports.getAllUsers = asyncHandler(async (req, res, next) => {
	const response = await userSchema.find({});

	return res.status(200)
		.json({
			success: true,
			message: "all users are fetched succesfully",
			data: response
		})
})