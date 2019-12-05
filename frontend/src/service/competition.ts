import api from "./api"
import { withToken } from "./token"
import { AxiosResponse } from "axios"
import { Competition, ServerResponse } from "../types"

interface Participant{
    first_name: string;
    last_name: string;
    mail: string
}

export const fetchCompetitions = (): Promise<AxiosResponse<Competition[]>> => {
    return api.get('/allData', {
        ...withToken()
    })
}

export const createCompetition = (competitionName: string): Promise<AxiosResponse<ServerResponse>> => {
    return api.post('/competitions', {
        competitionName
    }, {
        ...withToken()
    })
}

export const changeCompetitionName = (competitionID: string, competitionName: string): Promise<AxiosResponse<ServerResponse>> => {
    return api.patch(`/competitions/${competitionID}`, {
        newCompetitionName: competitionName
    }, {
        ...withToken()
    })
}

export const eraseCompetition = (competitionID: string): Promise<AxiosResponse<ServerResponse>> => {
    return api.delete(`/competitions/${competitionID}`, {
        ...withToken()
    })
}

export const addCompetitionParticipant = (competitionID: string, participant: Participant): Promise<AxiosResponse<ServerResponse>> => {
    return api.post(`/competitions/${competitionID}/users`, participant, {
        ...withToken()
    })
}

export const removeCompetitionParticipant = (competitionID: string, participantID: string): Promise<AxiosResponse<ServerResponse>> => {
    return api.delete(`/competitions/${competitionID}/users/${participantID}`, {
        ...withToken()
    })
}

export const sendMailWithParticipants = (mail: string): Promise<AxiosResponse<ServerResponse>> => {
    return api.post('/sendmail', {
        mail
    }, {
        ...withToken()
    })
}