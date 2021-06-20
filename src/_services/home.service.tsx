import Config from '../config.json';
import { handleResponse } from '../_lib/_utils/handle-response';
import { News } from '../_lib/types'

export const homeService = {
    getNews
};

function getNews(): Promise<News[]> {
    return fetch(`${Config.HOST}/api/home`)
        .then(data => handleResponse<News[]>(data));
};
