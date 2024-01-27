import { useState } from 'react';
import {useCookies} from 'react-cookie'

import {authFunc} from '../api/users'

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
	const [isLogin, setIsLogin] = useState(true);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const viewLogin = (status) => {
		setIsLogin(status);
	};

    console.log(cookies);
    console.log(isLogin);

	const handleSubmit = async (e, endpoint) => {
		e.preventDefault();
		if (!isLogin && password !== confirmPassword) {
			setError('Make sure password much');
			return;
		}

		await authFunc(email, password, setError, setCookie, endpoint)
	};

	return (
		<div className="auth-container">
			<div className="auth-container-box">
				<form onSubmit={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}>
					<h2>{isLogin ? 'Please log in!' : 'Please sign up!'}</h2>
					<label htmlFor=""></label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>

					<label htmlFor=""></label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					/>

					{!isLogin && (
						<>
							<label htmlFor=""></label>
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="Confirm Password"
							/>
						</>
					)}
					<button type="submit" className="create">
						Submit
					</button>
					{error && <p>{error}</p>}
				</form>
				<div className="auth-options">
					<button
						type="button"
						style={{ backgroundColor: !isLogin ? '#fff' : 'rgb(188, 188, 188)' }}
						onClick={() => viewLogin(false)}
					>
						Sign Up
					</button>
					<button
						type="button"
						style={{ backgroundColor: isLogin ? '#fff' : 'rgb(188, 188, 188)' }}
						onClick={() => viewLogin(true)}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Auth;
