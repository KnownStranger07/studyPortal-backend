const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {


	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a pre-save hook to send email before the document is saved
OTPSchema.pre("save", async function () {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	// No need to call next() — Mongoose resolves async hooks via the returned Promise
});

/**
 * Here, in pre middleware, happening before doing entry in the DB, we can get "next" and access elements using "this"
 * In post middleware, we cant use "this", instead, we get "doc" , ie, the object we just saced in DB,
 * in that post, we cant use this, and we can get "next" as second argument : schema.post("..", (doc, next)=>{..})
 */

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;