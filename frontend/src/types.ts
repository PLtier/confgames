// general

export interface Participant {
   _id ?: string
   first_name: string
   last_name: string
   mail: string
   date ? : string
}

export interface Competition {
   _id ? : string
   competitionName: string
   participants: Participant[]
}

// states

export interface UserState {
   isAuthenticated: boolean
   signInError: boolean
   username: string
}

export interface CompetitionsState {
   competitions: Competition[]
   fetchError: boolean
}

export interface RootState {
   user: UserState
   competitions: CompetitionsState
}

// response

export interface ServerResponse{
   success: boolean
   message?: string
}

// credentials

export interface Credentials{
   username: string;
   password: string;
}

// actions

export interface Action {
   type: string
   payload: {}
}

export interface SignInAction extends Action {
   payload: {
      username: string
      password: string
   }
}
export interface CreateCompetitionAction extends Action {
   payload: {
      competitionName: string
   }
}
export interface EraseCompetitionAction extends Action {
   payload: {
      competitionID: string
   }
}
export interface ChangeCompetitionNameAction extends Action {
   payload: {
      competitionID: string
      competitionName: string
   }
}
export interface AddCompetitionParticipantAction extends Action {
   payload: {
      competitionID: string
      user: {
         first_name: string
         last_name: string
         mail: string
      }
   }
}

export interface RemoveCompetitionParticipantAction extends Action {
   payload: {
      competitionID: string
      participantID: string
   }
}

export interface FetchCompetitonsSucceddedAction extends Action{
   payload: {
      competitions: Competition[]
   }
}

export interface SendMailAction extends Action{
   payload: {
      mail: string
   }
}
//theme 

export type ThemeColor = 'primary' | 'secondary' | 'tertiary' | 'dark' | 'white' | 'danger'

export interface Theme{
   color: {
       primary: string
       secondary: string
       tertiary: string
       dark: string
       white: string
       danger: string
   }
}