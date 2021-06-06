import React, { useState, forwardRef, useEffect } from 'react';
import './RoomReservation.css';
import { Link, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { reservationsService } from '../../../_services/reservations.service';
import { roomsService } from '../../../_services/rooms.service';
import { Room } from '../../../_lib/types';
import SyncLoader from 'react-spinners/SyncLoader';
import BarLoader from 'react-spinners/BarLoader';

export default function RoomReservation() {

    const history = useHistory();
    
    const [rooms, setRooms] = useState<Room[]>([]);

    const [room, setRoom] = useState<Room | null>(null);
    const [date, setDate] = useState<Date | null>(null);
    const [count, setCount] = useState<number | null>(null);
    const [isFree, setIsFree] = useState<boolean | null>(null);
    const [isDateConfirmed, setIsDateConfirmed] = useState(false);
    const [isCountConfirmed, setIsCountConfirmed] = useState(false);
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
        if (isCountConfirmed) {
            setIsCountConfirmed(false);
            return;
        }

        if (isDateConfirmed) {
            setCount(null);
            setIsDateConfirmed(false);
            return;
        }

        setDate(null);
        setIsFree(null);

        if (room !== null) {
            setRoom(null);
        }
    }

    const saveReservation = () => {
        if (date && room && count) {
            reservationsService.reserve(date, room.id, count)
                .then(
                    _ => history.push('/reservation/room/saved'), 
                    _ => {}
                );
        }
    }

    useEffect(() => {
        roomsService.getRooms()
            .then(data => {
                setLoading(false);
                setRooms(data);
            });
    }, [])

    useEffect(() => {
        if (date && room) {
            setIsFree(null);
            setDateLoading(true)
            reservationsService.checkDate(date, room.id)
                .then(_ => {
                    setDateLoading(false);
                    setIsFree(true);
                }, _ => {
                    setDateLoading(false);
                    setIsFree(false);
                });
        }
    }, [date, room])

	return (
		<section id="room-reservation-section">
            <h1>
                <Link to={ room !== null ? '/reservation/room' : '/reservation' } 
                    onClick={handleBack} id="back-button">BACK</Link>
                { room !== null ? (isDateConfirmed ? (isCountConfirmed ? 'CONFIRMATION' : 'SELECT COUNT') : 'SELECT A DATE') : 'BOOK A ROOM' }
            </h1>
            {
                room !== null ? (
                    <div className="selected-room-block">
                        <div>
                            <p>Selected room:</p>
                            <div id="selected-room-block-image" 
                                style={{backgroundImage: `url("${room.image}")`}}>
                                <div>
                                    <h3>{ room.tableCount } tables</h3>
                                </div>
                            </div>
                        </div>
                        <div className="reservation-settings-block">
                            <div className="reservation-settings-list">
                                {
                                    !isDateConfirmed && (
                                        <div className="settings-block">
                                            <p>Check a date:</p>
                                            <div>
                                                <DatePicker selected={date}
                                                    disabled={loading} 
                                                    dateFormat="dd.MM.yyyy"
                                                    onChange={date => date instanceof Date ? setDate(date) : null} 
                                                    customInput={<CustomDatePicker />}/>
                                            </div>
                                            {
                                                dateLoading && (
                                                    <div id="date-loading-spinner">
                                                        <BarLoader loading={true} width={75} height={5} />
                                                    </div>
                                                )
                                            }
                                            {
                                                isFree != null && (isFree ? 
                                                (<p className="date-free">FREE</p>) : 
                                                (<p className="date-occupied">OCCUPIED</p>))
                                            }
                                        </div>
                                    )
                                }
                                {
                                    isDateConfirmed && (
                                        <div className="settings-block">
                                            <p>Selected date:</p>
                                            <div className="value-block">
                                                { selectedDate }
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    isDateConfirmed && !isCountConfirmed && (
                                        <div className="settings-block">
                                            <p>Number of people:</p>
                                            <input className="value-block" type="number" 
                                                value={count ?? 0}
                                                onChange={e => 
                                                    parseInt(e.target.value) ? setCount(parseInt(e.target.value)) : setCount(null)
                                                }/>
                                        </div>
                                    )
                                }
                                {
                                    isCountConfirmed && (
                                        <div className="settings-block">
                                            <p>Number of people:</p>
                                            <div className="value-block">
                                                { count }
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="confirmation-block">
                                {
                                    date && isFree && !isDateConfirmed &&
                                        <button onClick={_ => setIsDateConfirmed(true)}>
                                            CONFIRM DATE
                                        </button>

                                }
                                {
                                    count !== null && (isCountConfirmed ? (
                                        <button onClick={saveReservation}>
                                            CONFIRM
                                        </button>
                                    ) : (
                                        <button onClick={_ => setIsCountConfirmed(true)}>
                                            CONFIRM COUNT
                                        </button>
                                    ))
                                }
                            </div>
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
