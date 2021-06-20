import React from 'react';
import './RoomReservationSaved.css';
import { Link } from 'react-router-dom';

export default function RoomReservationSaved() {
	return (
		<section id="room-reservation-saved-section">
            <h1>ROOM RESERVED</h1>
            <Link to='/reservation/history'>RESERVATION HISTORY</Link>
            <Link to='/not-implemented'>CONTINUE TO ORDER</Link>
            <Link to='/'>OK</Link>
        </section>
	);
}
