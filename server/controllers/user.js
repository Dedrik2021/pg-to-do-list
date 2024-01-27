const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../db');

const login = async (req, res, next) => {
	const { email, password } = req.body;
	let success, user;
	try {
		user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
	} catch (err) {
		return next('Error login user', err);
	}
	if (!user) return res.json({ detail: 'User does not exist!' });

    try {
        success = await bcrypt.compare(password, user.rows[0].hashed_password)
    } catch(err) {
        return next("Error login user", err)
    }

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

    if (success) {
        res.json({'email': user.rows[0].email, token})
    } else {
        res.json({detail: "Login failed"})
    }
};

const signup = async (req, res, next) => {
	const { email, password } = req.body;
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	let signup;
	try {
		signup = await pool.query(`INSERT INTO users(email, hashed_password) VALUES($1, $2)`, [
			email,
			hashedPassword,
		]);
	} catch (err) {
		if (err) {
			res.json({ detail: err.detail });
		}
		return next('Error signup user', err);
	}

	const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' });

	res.json({ email, token });
};

module.exports = {
	login,
	signup,
};
