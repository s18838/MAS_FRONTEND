import React from 'react';
import './AccountEnter.css';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
	return (
		<div className="account-enter-block">
            <h3>CREATE ACCOUNT</h3>
            <div className="input-block">
                <label htmlFor="email-input">Email</label>
                <input id="email-input" type="email"/>
            </div>
            <div className="input-block">
                <label htmlFor="email-name">Name</label>
                <input id="email-name" type="text"/>
            </div>
            <div className="input-block">
                <label htmlFor="email-surname">Surname</label>
                <input id="email-surname" type="text"/>
            </div>
            <div className="input-block">
                <label htmlFor="password-input">Password</label>
                <input id="password-input" type="password"/>
            </div>
            <button>Create account</button>

            <span>OR</span>

            <Link to='/authorize' id="other-option">Sing in</Link>
		</div>
	);
}
