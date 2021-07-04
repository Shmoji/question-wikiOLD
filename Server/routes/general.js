const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({
		message: "Hello, I am Question Wiki"
	});
});

router.get("/about", (req, res) => {
	res.status(200).json({
		message: "This route will eventually celebrate who we are and what we do."
	});
});

module.exports = router;