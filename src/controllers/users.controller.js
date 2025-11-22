const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// service
const UserService = require("../services/users.service");

// helper
const { generateAccessToken, generateRefreshToken } = require("../helpers");

const userController = {
	signup: async (req, res) => {
		const body = req.body?.data || req.body || {};
		const {
			first_name,
			last_name,
			email,
			role,
			address,
			city,
			country,
			state,
			password,
		} = body;
		console.log(body);
		//extract errors from request
		const errors = validationResult(req);

		//Check are there any errors
		if (!errors.isEmpty()) {
			return res.status(400).json({
				msg: "Validation failed",
				isSuccess: false,
				errors: errors.array().map((err) => {
					return {
						msg: err.msg,
						key: err.param.split(".")[1],
					};
				}),
			});
		}

		//Check email exist
		const emailExisted = await UserService.findEmail(email);

		if (emailExisted) {
			return res.status(400).json({
				msg: "Email has already existed",
				isSuccess: false,
			});
		}

		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		//Creat a new user
		const payload = {
			first_name,
			last_name,
			email,
			address,
			city,
			country,
			state,
			role,
			password: hashPassword,
		};

		try {
			await UserService.create(payload);
			res.json({
				msg: "Register user successfully!",
				isSuccess: true,
			});
		} catch (err) {
			res.status(400).json({
				msg: err,
				isSuccess: false,
			});
		}
	},

	/*
	 * LOGIN
	 * @req
	 * @res
	 */
		signin: async (req, res) => {
			const body = req.body?.data || req.body || {};
			const { email, password } = body;

			//Validation errors
			const errors = validationResult(req);

			//Check if are there any errors
			if (!errors.isEmpty()) {
				return res.status(400).json({
					msg: "Validation failed",
					isSuccess: false,
					errors: errors.array(),
				});
			}

		//Check email exists
		const user = await UserService.findEmail(email);

		if (!user) {
			return res.status(400).json({
				msg: "Email or password is wrong",
				isSuccess: false,
			});
		}

		//Check password
		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) {
			return res.status(400).json({
				msg: "Email or Password is wrong",
				isSuccess: false,
			});
		}

		//Create and assign a token
		const payload = {
			user: {
				id: user.id,
				email: user.email,
				first_name: user.first_name,
				last_name: user.last_name,
				address: user.address,
				city: user.city,
				country: user.country,
				state: user.state,
				role: user.role,
			},
		};

		const access_token = generateAccessToken(payload);
		const refresh_token = generateRefreshToken(payload);

		res.header("x-auth-token", access_token).json({
			msg: "Login Successfully",
			isSuccess: true,
			data: {
				access_token,
				refresh_token,
			},
		});
	},

	/* Find Users */

	findAllUser: async (req, res) => {
		const page = parseInt(req.query.page || 1);
		const limit = parseInt(req.query.limit || 10);
		const startOffset = (page - 1) * limit;
		const endOffset = startOffset + limit;

		try {
			const users = await UserService.findAll();
			const total = users.length;
			const newUsers = users.map((item) => {
				delete item._doc.password;
				return {
					...item._doc,
				};
			});

			const result = {
				data: newUsers,
				page,
				limit,
				total,
				isSuccess: true,
			};

			if (total === 0) return res.status(200).json(result);

			result.data = newUsers.slice(startOffset, endOffset);
			res.status(200).json(result);
		} catch (err) {
			res.status(500).json({
				msg: `Server Error ${err}`,
				isSuccess: false,
			});
		}
	},

	/**
	 * Find User
	 */
	findUser: async (req, res) => {
		const id = req.params.id;
		try {
			const user = await UserService.findOne(id);
			delete user._doc.password;
			res.status(200).json({
				data: user,
				isSuccess: true,
			});
		} catch (err) {
			res.status(400).json({
				msg: "User not found",
				isSuccess: false,
			});
		}
	},

	/**
	 * Update user
	 */
	updateUser: async (req, res) => {
		const id = req.params.id;
		const role = req.body.data?.role;
		const profile = {};
		if (role) profile.role = role;

		try {
			const user = await UserService.update(id, profile);
			if (!user) {
				return res.status(400).json({
					data: "User not found",
					isSuccess: false,
				});
			}

			res.status(200).json({
				msg: "Update user successfully",
				isSuccess: true,
			});
		} catch (err) {
			res.status(400).json({
				msg: `Can't update for user ${err}`,
				isSuccess: false,
			});
		}
	},

	/**
	 * Delete user
	 */
	deleteUser: async (req, res) => {
		const id = req.params.id;
		try {
			const user = await UserService.delete(id);
			if (!user) {
				return res.status(400).json({
					msg: "User not found for delete",
					isSuccess: false,
				});
			}

			res.status(200).json({
				msg: "Delete user successfully",
				isSuccess: true,
			});
		} catch (err) {
			res.status(500).json({
				msg: `Server error ${err}`,
				isSuccess: false,
			});
		}
	},

	/**
	 * Refresh token
	 */
	refreshToken: async (req, res) => {
		const refreshToken = req.body.data.refresh_token;
		if (refreshToken) {
			jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
				if (err) {
					res.status(404).json({
						msg: "No Authenticate",
						isSuccess: false,
					});
					return;
				}

				const payload = {
					user,
				};

				const newAccessToken = generateAccessToken(payload);
				res.status(200).json({
					msg: "Refresh token successfully",
					isSuccess: true,
					data: {
						access_token: newAccessToken,
					},
				});
			});

			return;
		}

		res.status(400).json({
			msg: "No Refresh Token",
			isSuccess: false,
		});
	},
};

module.exports = userController;
