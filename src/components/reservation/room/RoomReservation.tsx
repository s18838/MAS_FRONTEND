import React, { useState, forwardRef, useEffect } from 'react';
import './RoomReservation.css';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { get, post } from '../../../lib/communication';
import { Room } from '../../../lib/types';
import SyncLoader from 'react-spinners/SyncLoader';
import BarLoader from 'react-spinners/BarLoader';

export default function RoomReservation() {

    const history = useHistory();
    
    const [rooms, setRooms] = useState<Room[]>([]);

    const [room, setRoom] = useState<Room | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [isFree, setIsFree] = useState<boolean | null>(null);
    const [isConfirmation, setIsConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dateLoading, setDateLoading] = useState(false);

    const selectedDate = date && `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.`
        + `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.`
        + `${date.getFullYear()}`

    const CustomDatePicker = forwardRef<HTMLButtonElement, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>(
        ({value, onClick}, ref) => (
            <button id="date-picker" onClick={onClick} ref={ref}>
                { value === '' ? "SELECT DATE" : value }
            </button>
        ),
    );

    const handleBack = () => {
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

    useEffect(() => {
        get<Room[]>('http://localhost:7778/rooms')
            .then(data => {
                setLoading(false);
                setRooms(data);
            });
    }, [])

    useEffect(() => {
        if (date) {
            setIsFree(null);
            setDateLoading(true)
            post('http://localhost:7778/check', { date: date.toLocaleDateString() })
                .then(_ => {
                    setDateLoading(false);
                    setIsFree(true);
                }, _ => {
                    setDateLoading(false);
                    setIsFree(false);
                });
        }
    }, [date])

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
                                style={{backgroundImage: `url("${room.image}")`}}>
                                <div>
                                    <h3>{ room.tableCount } tables</h3>
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
                                                        disabled={loading} 
                                                        dateFormat="dd.MM.yyyy"
                                                        onChange={date => date instanceof Date ? setDate(date) : null} 
                                                        customInput={<CustomDatePicker />}/>
                                                </div>
                                                <div id="date-loading-spinner">
                                                    {
                                                        isFree != null && (isFree ? 
                                                        (<p className="date-free">FREE</p>) : 
                                                        (<p className="date-occupied">OCCUPIED</p>))
                                                    }
                                                    <BarLoader loading={dateLoading} width={75} height={5} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="confirmation-block">
                                            {
                                                date && isFree &&
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
                    <>
                        {
                            loading && (
                                <div className="loader">
                                    <SyncLoader loading={true} size={25} margin={20}/>
                                </div>
                            )
                        }
                        <ul>
                            {
                                rooms.map((room, index) => (
                                    <li key={index} className="room-reservation-block" onClick={_ => setRoom(room)}>
                                        <div className="room-reservation-block-image" 
                                            style={{backgroundImage: `url("${room.image}")`}}>
                                            <div>
                                                <h3>{ room.tableCount } tables</h3>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                )
            }
        </section>
	);
}
