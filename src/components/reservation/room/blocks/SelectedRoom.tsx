import React, { useEffect } from 'react';
import './ReservationBlock.css';
import { useHistory } from 'react-router-dom';
import { reservationsService } from '../../../../_services/reservations.service';
import { Room } from '../../../../_lib/types';
import SelectDate from './SelectDate';
import NumberPeople from './NumberPeople';

type SelectedRoomProp = {
    room: Room,
    date: Date | null,
    count: number | null,
    isFree: boolean | null,
    dateLoading: boolean,
    isCountConfirmed: boolean,
    isDateConfirmed: boolean,
    setIsFree: (_: boolean | null) => void,
    setDateLoading: (_: boolean) => void,
    setDate: (_: Date | null) => void,
    setCount: (_: number | null) => void,
    setIsDateConfirmed: (_: boolean) => void,
    setIsCountConfirmed: (_: boolean) => void
}

export default function SelectedRoom({ 
    room, date, count, isFree, dateLoading, isCountConfirmed, isDateConfirmed, 
    setIsFree, setDateLoading, setDate, setCount, setIsDateConfirmed, setIsCountConfirmed
}: SelectedRoomProp) {

    const history = useHistory();

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
    }, [date, room, setDateLoading, setIsFree])

	return (
        <>
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
                        <SelectDate {...{ date, dateLoading, isFree, setDate, isDateConfirmed }}/>
                        <NumberPeople {...{ isDateConfirmed, isCountConfirmed, count, setCount }}/>
                    </div>
                </div>
            </div>
            <div className="confirmation-block">
                {
                    date && isFree && 
                    (
                        !isDateConfirmed ? (
                            <button onClick={_ => setIsDateConfirmed(true)}>
                                CONFIRM DATE
                            </button>
                        ) : count !== null ? (
                                isCountConfirmed ? (
                                    <button onClick={saveReservation}>
                                        CONFIRM
                                    </button>
                                ) : (
                                    <button onClick={_ => setIsCountConfirmed(true)}>
                                        CONFIRM COUNT
                                    </button>
                                ) 
                            ) : null
                    )
                }
            </div>
        </>
	);
}
