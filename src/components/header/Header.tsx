import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header>
			<ul>
                <Link to='/'>HOME</Link>
                <Link to='/menu'>MENU</Link>
                <Link to='/reservation'>RESERVATION</Link>
                <Link to='/authorize'>SIGN IN</Link>
            </ul>
		</header>
	);
}
