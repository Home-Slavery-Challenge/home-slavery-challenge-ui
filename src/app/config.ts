import {environment} from '../environments/environment';

const doorApi = "/api"
export const apiLogin = environment.apiUrl + doorApi + "/login"
export const apiAuth = environment.apiUrl + doorApi + "/auth"
export const apiFriendship = environment.apiUrl + doorApi + "/friendship"
