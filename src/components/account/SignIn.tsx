import React from 'react';
import './AccountEnter.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
	return (
		<div className="account-enter-block">
            <h3>SIGN IN</h3>
            <div className="input-block">
                <label htmlFor="email-input">Email</label>
                <input id="email-input" type="email"/>
            </div>
            <div className="input-block">
                <label htmlFor="password-input">Password</label>
                <input id="password-input" type="password"/>
            </div>
            <button>Sign in</button>

            <span>OR</span>

            <Link to='/register' id="other-option">Create account</Link>
		</div>
	);
}
