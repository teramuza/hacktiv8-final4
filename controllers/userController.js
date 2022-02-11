const { User } = require("../models");
const { generateToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class userController {
    static register(req, res) {
		let input = {
			email: req.body.email,
            full_name: req.body.full_name,
            username: req.body.username,
			password: req.body.password,
            profile_image_url: req.body.profile_image_url,
			age: req.body.age,
            phone_number: req.body.phone_number
		};

        User.create(input)
        .then(result => {
            res.status(201).json({
                user: {
                    email: result.email,
                    full_name: result.full_name,
                    username: result.username,
                    profile_image_url: result.profile_image_url,
                    age: result.age,
                    phone_number: result.phone_number
                } 
            });
        })
        .catch((err => {
            res.status(500).json({
                message: err.errors[0].message
            });
        }));
    }


	static login(req, res) {
		let email = req.body.email;
		User.findOne({where: {email: email}})
			.then(data => {
				if (!data) {
					res.status(401).json({ message: "Invalid Credentials" });
				} else {
					let compare = comparePassword(req.body.password, data.password);
					if (compare == true) {
						let payload = { 
                            id: data.id,
                            email: data.email,
                            full_name: data.full_name,
                            username: data.username,
                            profile_image_url: data.profile_image_url,
                            age: data.age,
                            phone_number: data.phone_number,
                        } 
                        const token = generateToken(payload);
						res.status(200).json({
							token: token
						});
						// res.status(200).json({ token: token });
					} else {
						res.status(401).json({ message: "Invalid Credentials" });
					}
				}
			})
			.catch(err => {
                res.status(401).json(err);
            });
	}

	static update(req, res) {
		let id = req.params.id;
        let input = {
			email: req.body.email,
            full_name: req.body.full_name,
            username: req.body.username,
            profile_image_url: req.body.profile_image_url,
			age: req.body.age,
            phone_number: req.body.phone_number
		};

		User.update(
            input,
            {
                where: {
                    id: id
                },
                returning: true
            }
        )
        .then(result => {
            res.status(200).json({
                user: {
                    email: result[1][0].email,
                    full_name: result[1][0].full_name,
                    username: result[1][0].username,
                    profile_image_url: result[1][0].profile_image_url,
                    age: result[1][0].age,
                    phone_number: result[1][0].phone_number
                } 
            });
        })
        .catch(err => {
            res.status(500).json({
                message: err.errors[0].message
            });
        });
	}
    
    static delete(req, res) {
    	let id = req.params.id;
    	User.destroy({
            where: {
                id: id
            }
        })
        .then(result => {
            if (!result) {
                res.status(500).json({ message: "Account does not exist" });
            } else {
                res.status(200).json({ message: "Your account has been successfully deleted" });
            }

        })
        .catch(err => {
            res.status(500).json(err);
        });
    }

}

module.exports = userController;
