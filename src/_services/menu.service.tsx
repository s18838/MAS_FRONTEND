import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { Dish } from '../_lib/types'

export const menuService = {
    getMenu
};

function getMenu(): Promise<Dish[]> {
    return fetch(`${Config.HOST}/api/menu`)
        .then(data => handleResponse<Dish[]>(data));
};
