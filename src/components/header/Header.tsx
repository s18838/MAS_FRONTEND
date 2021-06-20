import React, { useState, useRef } from 'react';
import './Header.css'
import { Link, useHistory } from 'react-router-dom';
import { authenticationService } from '../../_services/authentication.service';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default function Header() {

    const history = useHistory();

    const user = authenticationService.currentUserValue;

    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLAnchorElement | null>(null);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClose = (event: React.MouseEvent<Document>) => {
        if (anchorRef.current 
            && event.target instanceof HTMLParagraphElement 
            && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const logout = () => {
        setOpen(false);
        authenticationService.logout();
        history.push('/');
    }

	return (
		<header>
			<ul>
                <Link to='/'>HOME</Link>
                <Link to='/menu'>MENU</Link>
                <Link to='/reservation'>RESERVATION</Link>
                {
                    user ? (
                        <>
                            <Link ref={anchorRef} onClick={handleToggle} to='#'>ACCOUNT</Link>
                            { 
                                anchorRef.current && (
                                    <Popper open={open} anchorEl={anchorRef.current} transition>
                                        {({ TransitionProps, placement }) => (
                                            <Grow {...TransitionProps}>
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList>
                                                            <p>{user.name} {user.surname}</p>
                                                            <Link to="/reservation/history">
                                                                <MenuItem>Reservation history</MenuItem>
                                                            </Link>
                                                            <MenuItem onClick={logout}>Logout</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                            )}
                        </>
                    ) : (
                        <Link to='/authorize'>SIGN IN</Link>
                    )
                }
            </ul>
		</header>
	);
}
