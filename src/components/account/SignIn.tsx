import React, { useState } from 'react';
import './AccountEnter.css';
import { Link, useHistory } from 'react-router-dom';
import { authenticationService } from '../../_services/authentication.service';
import SyncLoader from 'react-spinners/SyncLoader';

export default function SignIn() {

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(false);
        setLoading(true);
        authenticationService.authorize(email, password)
            .then(
                _ => history.push('/'),
                _ => {
                    setError(true);
                    setLoading(false);
                }
            )
    }

	return (
		<div className="account-enter-block">
            <h3>SIGN IN</h3>
            { error && <div className="failed">FAILED</div> }
            <form onSubmit={signIn}>
                <div className="input-block">
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" type="email" required
                        value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-block">
                    <label htmlFor="password-input">Password</label>
                    <input id="password-input" type="password" required minLength={6}
                        value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                {
                    loading ? 
                    <div className="account-loader">
                        <SyncLoader loading={true} size={12} margin={20}/>
                    </div> :
                    <button type="submit">Sign in</button>
                }
            </form>

            <span>OR</span>

            <Link to='/register' id="other-option">Create account</Link>
		</div>
	);
}
