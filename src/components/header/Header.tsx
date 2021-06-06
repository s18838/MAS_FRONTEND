import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { authenticationService } from '../../_services/authentication.service'

export default function Header() {

    const user = authenticationService.currentUserValue;

    const logout = () => {
        authenticationService.logout()
    }

	return (
		<header>
			<ul>
                <Link to='/'>HOME</Link>
                <Link to='/menu'>MENU</Link>
                <Link to='/reservation'>RESERVATION</Link>
                {
                    user ? (
                        <Link to='/' onClick={logout}>LOGOUT - {user.name} {user.surname}</Link>
                    ) : (
                        <Link to='/authorize'>SIGN IN</Link>
                    )
                }
            </ul>
		</header>
	);
}
