import api from './api'
import { AxiosResponse } from 'axios'
import { ServerResponse, Credentials } from '../types'

export const signIn = ({username, password}: Credentials): Promise<AxiosResponse<ServerResponse>> => {
    return api.post('/log/in', {
        sponsorName: username,
        password: password
    })
}
