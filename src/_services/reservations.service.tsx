import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { authHeader } from '../_lib/_utils/auth-header';
import { Room } from '../_lib/types';

export const reservationsService = {
    checkDate,
    reserve,
    getReservedRooms
};

function prepareDate(date: Date): string{
    var copiedDate = new Date(date.getTime()); 
    const hoursDiff = copiedDate.getHours() - copiedDate.getTimezoneOffset() / 60;
    copiedDate.setHours(hoursDiff);
    return copiedDate.toISOString();
};

function reserve(date: Date, roomId: number, personCount: number): Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader() 
        },
        body: JSON.stringify({ 
            date: prepareDate(date), 
            roomId,
            personCount
        })
    };

    return fetch(`${Config.HOST}/api/reservations`, requestOptions)
        .then(data => handleResponse(data));
};

function checkDate(date: Date, roomId: number): Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader()
        },
        body: JSON.stringify({ 
            date: prepareDate(date), 
            roomId
        })
    };

    return fetch(`${Config.HOST}/api/reservations/check`, requestOptions)
        .then(data => handleResponse(data));
};

function getReservedRooms(): Promise<Room[]> {
    const requestOptions = {
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader()
        }
    };

    return fetch(`${Config.HOST}/api/reservations/rooms`, requestOptions)
        .then(data => handleResponse<Room[]>(data));
};
