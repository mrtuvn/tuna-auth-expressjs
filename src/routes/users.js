const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const { uploadAvatar } = require("../middlewares/upload");
const { check } = require("express-validator");

// controllers
const UserController = require("../controllers/users.controller");

// @route    GET api/user
// @desc     Get user list
// @access   Public
router.get("/", UserController.findAllUser);

// @route    GET api/user/:id
// @desc     GET User
// @access   Public
router.get("/:id", UserController.findUser);

// @route    PUT api/user
// @desc     Update User
// @access   Public
router.put("/:id", UserController.updateUser);

// @route    DELETE api/user/:id
// @desc     Delete User
// @access   Public
router.delete("/:id", UserController.deleteUser);

// @route    POST api/user/signup
// @desc     Register user
// @access   Public
router.post(
	"/signup",
	[
		check("first_name", "First Name is required").not().isEmpty(),
		check("last_name", "Last Name is required").not().isEmpty(),
		check("email", "Please include a valid email").isEmail(),
		check("address", "Address is required").not().isEmpty(),
		check("city", "City is required").not().isEmpty(),
		check("country", "Country is required").not().isEmpty(),
		check("state", "State is required").not().isEmpty(),
		check("role", "Role is required").not().isEmpty(),
		check(
			"password",
			"Password must be at least 6 characters"
		).isLength({ min: 6 }),
	],
	UserController.signup
);

// @route    POST api/user/signin
// @desc     Login user
// @access   Public
router.post(
	"/signin",
	[
		check("email", "Please include a valid email").isEmail(),
		check("password", "Password is required").exists(),
	],
	UserController.signin
);

// @route    POST api/user/refresh-token
// @desc     Refresh token
// @access   Public
router.post("/refresh-token", UserController.refreshToken);

// @route    GET api/user/upload-image
router.post("/upload-image", uploadAvatar, async (req, res) => {
	const link = "public/uploads/" + req.file.filename;
	const name = req.file.filename.split(".")[0];

	try {
		cloudinary.uploader.upload(
			link,
			{ public_id: name },
			function (error, result) {
				console.log(result);
			}
		);
	} catch (e) {
		console.log(e);
	}
});

module.exports = router;
