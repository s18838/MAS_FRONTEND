import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { Room } from '../_lib/types'

export const roomsService = {
    getRooms
};

function getRooms(): Promise<Room[]> {
    return fetch(`${Config.HOST}/api/rooms`)
        .then(handleResponse)
};
