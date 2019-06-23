const axios = require("axios");

const baseUrl = "http://localhost:4245";
async function seed() {
	var user;
	var token;
	try {
		var { token, ...user } = (await axios(`${baseUrl}/api/auth/signup`, {
			method: 'post',
			data: {
				username: "test",
				password: "test",
				email: "test@test.com",
				profileImageUrl: ""
			}
		})).data;
	} catch (e) {
		if (e.response.data.error.code === 11000) {
			try {
				var { token, ...user } = (await axios(`${baseUrl}/api/auth/signin`, {
					method: 'post',
					data: {
						email: 'test@test.com',
						password: 'test',
					},
				})).data;
			} catch (e) {
				console.error(e.response.data.error);
			}
		} else {
			console.error(e.response.data.error);
		}
	}

	axios.defaults.headers["Authorization"] = `Bearer ${token}`;

	try {
		await axios(`${baseUrl}/api/users/${user.id}/messages`, {
			method: 'post',
			data: {
				text: 'Hello World!',
			},
		});
		console.log('Created message for', user.id);
	} catch (e) {
		console.error(e.response.data.error)
	}

}

seed();
