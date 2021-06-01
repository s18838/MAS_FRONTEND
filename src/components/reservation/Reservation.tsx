import React from 'react';
import './Reservation.css'
import { Link } from 'react-router-dom';

export default function Reservation() {
	return (
		<section id="reservation-section">
            <h1>RESERVATION</h1>
            <ul>
                <Link to='/not-implemented' className="reservation-block">
                    <div className="reservation-block-image" 
                        style={{backgroundImage: `url("/images/reservation0.jpg")`}}>
                        <div>
                            <h3>Book a table</h3>
                        </div>
                    </div>
                </Link>
                <Link to='/reservation/room' className="reservation-block">
                    <div className="reservation-block-image" 
                        style={{backgroundImage: `url("/images/reservation1.jpg")`}}>
                        <div>
                            <h3>Book a room</h3>
                        </div>
                    </div>
                </Link>
            </ul>
        </section>
	);
}
