import React, { useState, useEffect } from 'react';
import './RoomReservation.css';
import { Link } from 'react-router-dom';
import { roomsService } from '../../../_services/rooms.service';
import { Room } from '../../../_lib/types';
import RoomsList from './blocks/RoomsList';
import SelectedRoom from './blocks/SelectedRoom';

export default function RoomReservation() {
    
    const [rooms, setRooms] = useState<Room[]>([]);

    const [room, setRoom] = useState<Room | null>(null);
    const [isDateConfirmed, setIsDateConfirmed] = useState(false);
    const [isCountConfirmed, setIsCountConfirmed] = useState(false);
    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState<Date | null>(null);
    const [count, setCount] = useState<number | null>(null);
    const [isFree, setIsFree] = useState<boolean | null>(null);
    const [dateLoading, setDateLoading] = useState(false);

    const handleBack = () => {
        if (isCountConfirmed) {
            setIsCountConfirmed(false);
            return;
        }

        if (isDateConfirmed) {
            setIsDateConfirmed(false);
            return;
        }

        setIsFree(null);

        if (room !== null) {
            setRoom(null);
        }
    }

    useEffect(() => {
        roomsService.getRooms()
            .then(data => {
                setLoading(false);
                setRooms(data);
            });
    }, [])

	return (
		<section id="room-reservation-section">
            <h1>
                <Link to={ room !== null ? '/reservation/room' : '/reservation' } 
                    onClick={handleBack} 
                    id="back-button">BACK</Link>
                { 
                    room !== null ? 
                        (isDateConfirmed ? 
                            (isCountConfirmed ? 'CONFIRMATION' : 'SELECT COUNT') 
                            : 'SELECT A DATE') 
                        : 'BOOK A ROOM' 
                }
            </h1>
            {
                room !== null ? (
                    <SelectedRoom {...{
                        room, date, count, isFree, dateLoading, isCountConfirmed, isDateConfirmed, 
                        setIsFree, setDateLoading, setDate, setCount, setIsDateConfirmed, setIsCountConfirmed
                    }}/>
                ) : (
                    <RoomsList rooms={rooms} loading={loading} setRoom={setRoom}/>
                )
            }
        </section>
	);
}
