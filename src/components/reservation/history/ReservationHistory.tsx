import React, { useState, useEffect } from 'react';
import './ReservationHistory.css'
import RoomsList from '../room/blocks/RoomsList';
import { Room, Reservation } from '../../../_lib/types';
import { reservationsService } from '../../../_services/reservations.service';
import { roomsService } from '../../../_services/rooms.service';
import SyncLoader from 'react-spinners/SyncLoader';


export default function ReservationHistory() {
    
    const [rooms, setRooms] = useState<Room[]>([]);
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const [reservationLoading, setReservationLoading] = useState(true);

    useEffect(() => {
        reservationsService.getReservedRooms()
            .then(data => {
                setLoading(false);
                setRooms(data);
            });
    }, [])

    useEffect(() => {
        if (!room) return;
        setReservationLoading(true);
        roomsService.getReservations(room.id)
            .then(data => {
                setReservations(data);
                setReservationLoading(false);
            });
    }, [room])

    const handleBack = () => {
        if (room !== null) {
            setRoom(null);
        }
    }

	return (
		<section id="reservation-history-section">
            <h1>
                {
                    room && <span onClick={handleBack} id="back-button">BACK</span>
                }
                RESERVATION HISTORY
            </h1>
            <h3>Room reservations</h3>
            {
                room ?
                    <div className="selected-room-block">
                        <div>
                            <div className="sticky">
                                <p>Selected room:</p>
                                <div id="selected-room-block-image" 
                                    style={{backgroundImage: `url("${room.image}")`}}>
                                    <div>
                                        <h3>{ room.tableCount } tables</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul id="reservation-history-list">
                            <li>
                                <div className="header-table-block ">Date</div>
                                <div className="header-table-block">Number of people</div>
                                <div className="header-table-block">Status</div>
                            </li>
                            {
                                reservationLoading && (
                                    <div className="loader">
                                        <SyncLoader loading={true} size={25} margin={20}/>
                                    </div>
                                )
                            }
                            {
                                reservations.map((reservation, index) => (
                                    <li key={index}>
                                        <div className="table-block ">{ reservation.reservationDate.toString().split('T')[0] }</div>
                                        <div className="table-block ">{ reservation.personCount }</div>
                                        <div className="table-block ">
                                            { 
                                                reservation.status === 0 ?
                                                    "ACTIVE" :
                                                reservation.status === 1 ?
                                                    "CANCELED" :
                                                reservation.status === 2 ?
                                                    "FINISHED" : "-"
                                            }
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                :
                    rooms.length > 0 || loading ?
                        <RoomsList rooms={rooms} loading={loading} setRoom={setRoom} />
                    : <p id="empty">You haven't had any reservations</p>
            }
        </section>
	);
}
