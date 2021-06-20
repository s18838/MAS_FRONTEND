import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { Room, Reservation } from '../_lib/types'
import { authHeader } from '../_lib/_utils/auth-header';

export const roomsService = {
    getRooms,
    getReservations
};

function getRooms(): Promise<Room[]> {
    return fetch(`${Config.HOST}/api/rooms`)
        .then(data => handleResponse<Room[]>(data));
};

function getReservations(id: number): Promise<Reservation[]> {
    const requestOptions = {
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader()
        }
    };

    return fetch(`${Config.HOST}/api/rooms/${id}/reservations`, requestOptions)
        .then(data => handleResponse<Reservation[]>(data));
};
