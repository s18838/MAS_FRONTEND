import React, { useState, forwardRef     } from 'react';
import './RoomReservation.css'
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function RoomReservation() {

    const history = useHistory();
    
    const [room, setRoom] = useState(null);
    const [date, setDate] = useState(null);
    const [isFree, setIsFree] = useState(null);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const selectedDate = date && `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.`
        + `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.`
        + `${date.getFullYear()}`

    const CustomDatePicker = forwardRef(
        ({ value, onClick }, ref) => (
            <button id="date-picker" onClick={onClick} ref={ref}>
                { value === '' ? "SELECT DATE" : value }
            </button>
        ),
    );

    const handleBack = (_) => {
        if (isConfirmation) {
            setIsConfirmation(false);
            return;
        }

        setDate(null);
        setIsFree(null);

        if (room !== null) {
            setRoom(null);
        }
    }

	return (
		<section id="room-reservation-section">
            <h1>
                <Link to={ room !== null ? '/reservation/room' : '/reservation' } 
                    onClick={handleBack} id="back-button">BACK</Link>
                { room !== null ? (isConfirmation ? 'CONFIRMATION' : 'SELECT A DATE') : 'BOOK A ROOM' }
            </h1>
            {
                room !== null ? (
                    <div className="selected-room-block">
                        <div>
                            <p id="selected-room">Selected room:</p>
                            <div id="selected-room-block-image" 
                                style={{backgroundImage: `url("/images/room${room}.jpg")`}}>
                                <div>
                                    <h3>{ ["10 tables", "5 tables", "3 tables"][room] }</h3>
                                </div>
                            </div>
                        </div>
                        <div className="date-block">
                            {
                                isConfirmation ? (
                                    <>
                                        <div className="selected-date-block">
                                            <p>Selected date:</p>
                                            <div id="selected-date">
                                                { selectedDate }
                                            </div>
                                        </div>
                                        <div className="confirmation-block">
                                            <button onClick={_ => history.push('/reservation/room/saved')}>
                                                CONFIRM
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="check-a-date-block">
                                            <p>Check a date:</p>
                                            <div>
                                                <div>
                                                    <DatePicker selected={date} 
                                                        dateFormat="dd.MM.yyyy"
                                                        onChange={date => setDate(date)} 
                                                        customInput={<CustomDatePicker />}/>
                                                </div>
                                                {
                                                    isFree != null && (isFree ? 
                                                    (<p className="date-free">FREE</p>) : 
                                                    (<p className="date-occupied">OCCUPIED</p>))
                                                }
                                            </div>
                                        </div>
                                        <div className="confirmation-block">
                                            {
                                                date &&
                                                <button onClick={_ => setIsConfirmation(true)}>
                                                    CONFIRM DATE
                                                </button>
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ) : (
                    <ul>
                        {
                            ["10 tables", "5 tables", "3 tables"].map((value, index) => (
                                <li className="room-reservation-block" onClick={_ => setRoom(index)}>
                                    <div className="room-reservation-block-image" 
                                        style={{backgroundImage: `url("/images/room${index}.jpg")`}}>
                                        <div>
                                            <h3>{ value }</h3>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </section>
	);
}
