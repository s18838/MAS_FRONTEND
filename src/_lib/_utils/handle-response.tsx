import { authenticationService } from '../../_services/authentication.service';

export function handleResponse<T>(response: Response): Promise<any> {
    return response.text().then(text => {
        const data = text && JSON.parse(text) as T;
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                window.location.reload();
            }

            const error = response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}