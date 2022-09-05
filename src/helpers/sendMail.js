const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (msg) => {
	try {
		await sgMail.send(msg);
		console.log("Sent!");
	} catch (e) {
		console.log(e);
		if (e.response) {
			console.error(error.response.body);
		}	
	}
}

module.exports = {
    sendMail
}