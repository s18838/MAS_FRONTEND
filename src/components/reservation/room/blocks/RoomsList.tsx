import React from 'react';
import './ReservationBlock.css';
import { Room } from '../../../../_lib/types';
import SyncLoader from 'react-spinners/SyncLoader';

type RoomsListProp = {
    loading: boolean,
    rooms: Room[],
    setRoom: (_: Room) => void
}

export default function RoomsList({ loading, rooms, setRoom }: RoomsListProp) {
	return (
        <>
            {
                loading && (
                    <div className="loader">
                        <SyncLoader loading={true} size={25} margin={20}/>
                    </div>
                )
            }
            <ul id="rooms-list">
                {
                    rooms.map((room, index) => (
                        <li key={index} className="rooms-list-item" onClick={_ => setRoom(room)}>
                            <div className="block-image" 
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
	);
}
