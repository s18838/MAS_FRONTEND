import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { authHeader } from '../_lib/_utils/auth-header';

export const reservationsService = {
    checkDate,
    reserve
};

function reserve(date: Date, roomId: number, personCount: number): Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader() 
        },
        body: JSON.stringify({ 
            date, 
            roomId,
            personCount
        })
    }

    return fetch(`${Config.HOST}/api/reservations`, requestOptions)
        .then(handleResponse)
};

function checkDate(date: Date, roomId: number): Promise<Response> {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            ...authHeader()
        },
        body: JSON.stringify({ 
            date, 
            roomId
        })
    }

    return fetch(`${Config.HOST}/api/reservations/check`, requestOptions)
        .then(handleResponse)
};
