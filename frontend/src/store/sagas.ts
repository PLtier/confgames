import {
   USER_SIGNIN_REQUESTED,
   USER_SIGNIN_SUCCEEDED,
   USER_SIGNIN_FAILED,
   FETCH_COMPETITIONS_SUCCEEDED,
   FETCH_COMPETITIONS_FAILED,
   FETCH_COMPETITIONS_REQUESTED,
   CREATE_COMPETITION_REQUESTED,
   CREATE_COMPETITION_SUCCEEDED,
   CREATE_COMPETITION_FAILED,
   CHANGE_COMPETITION_NAME_SUCCEEDED,
   CHANGE_COMPETITION_NAME_FAILED, 
   CHANGE_COMPETITION_NAME_REQUESTED,
   ERASE_COMPETITION_SUCCEEDED, 
   ERASE_COMPETITION_FAILED, 
   ERASE_COMPETITION_REQUESTED, 
   ADD_COMPETITION_PARTICIPANT_REQUESTED,
   REMOVE_COMPETITION_PARTICIPANT_REQUESTED, 
   USER_SIGNOUT_SUCCEDDED,
   USER_SIGNOUT_FAILED,
   USER_SIGNOUT_REQUESTED,
   SEND_MAIL_REQUESTED,
   SEND_MAIL_SUCCEDDED,
   SEND_MAIL_FAILED} from './actions'
import { 
    SignInAction,
   ChangeCompetitionNameAction, 
   CreateCompetitionAction, 
   EraseCompetitionAction, 
   AddCompetitionParticipantAction, 
   RemoveCompetitionParticipantAction, 
   SendMailAction} from '../types'

import { call, put, takeLatest } from 'redux-saga/effects'
import makeAction from './makeAction'
import * as userService from '../service/user'
import * as competitionService from '../service/competition'
import { saveToken, discardToken } from '../service/token'


function* signIn(action: SignInAction) {
   try {
      const { data: { token }} = yield call(userService.signIn, action.payload)
      saveToken(token)
      yield put(makeAction(USER_SIGNIN_SUCCEEDED)({
         username: action.payload.username
      }))
   } catch (e) {
      yield put(makeAction(USER_SIGNIN_FAILED)())
   }
}
function* signOut() {
   try {
      discardToken()

      yield put(makeAction(USER_SIGNOUT_SUCCEDDED)())
   } catch (e) {
      yield put(makeAction(USER_SIGNOUT_FAILED)())
   }
}

function* fetchCompetitions() {
   try {
      const { data, status } = yield call(competitionService.fetchCompetitions)
      if(status === 401){
         yield put(makeAction(USER_SIGNOUT_REQUESTED)())
         throw Error('Invalid token')
      }
      yield put(makeAction(FETCH_COMPETITIONS_SUCCEEDED)({
         competitions: data
      }))
   } catch (e) {
      yield put(makeAction(FETCH_COMPETITIONS_FAILED)())
   }
}
function* createCompetition(action: CreateCompetitionAction) {
   try {
      yield call(competitionService.createCompetition, action.payload.competitionName)
      yield put(makeAction(CREATE_COMPETITION_SUCCEEDED)())
      yield put(makeAction(FETCH_COMPETITIONS_REQUESTED)())
   } catch (e) {
      yield put(makeAction(CREATE_COMPETITION_FAILED)())
   }
}
function* changeCompetitionName(action: ChangeCompetitionNameAction) {
   try {
      yield call(competitionService.changeCompetitionName, action.payload.competitionID, action.payload.competitionName)
      yield put(makeAction(CHANGE_COMPETITION_NAME_SUCCEEDED)())
      yield put(makeAction(FETCH_COMPETITIONS_REQUESTED)())
   } catch (e) {
      yield put(makeAction(CHANGE_COMPETITION_NAME_FAILED)())
   }
}
function* eraseCompetition(action: EraseCompetitionAction) {
   try {
      yield call(competitionService.eraseCompetition, action.payload.competitionID)
      yield put(makeAction(ERASE_COMPETITION_SUCCEEDED)())
      yield put(makeAction(FETCH_COMPETITIONS_REQUESTED)())
   } catch (e) {
      yield put(makeAction(ERASE_COMPETITION_FAILED)())
   }
}
function* addCompetitionParticipant(action: AddCompetitionParticipantAction) {
   try {
      yield call(competitionService.addCompetitionParticipant, action.payload.competitionID, action.payload.user)
      yield put(makeAction(ERASE_COMPETITION_SUCCEEDED)())
      yield put(makeAction(FETCH_COMPETITIONS_REQUESTED)())
   } catch (e) {
      yield put(makeAction(ERASE_COMPETITION_FAILED)())
   }
}

function* removeCompetitionParticipant(action: RemoveCompetitionParticipantAction) {
   try {
      yield call(competitionService.removeCompetitionParticipant, action.payload.competitionID, action.payload.participantID)
      yield put(makeAction(ERASE_COMPETITION_SUCCEEDED)())
      yield put(makeAction(FETCH_COMPETITIONS_REQUESTED)())
   } catch (e) {
      yield put(makeAction(ERASE_COMPETITION_FAILED)())
   }
}
function* sendMailWithParticipants(action: SendMailAction) {
   try {
      yield call(competitionService.sendMailWithParticipants, action.payload.mail)
      yield put(makeAction(SEND_MAIL_SUCCEDDED)())
   } catch (e) {
      yield put(makeAction(SEND_MAIL_FAILED)())
   }
}
function* mySaga() {
  yield takeLatest(USER_SIGNIN_REQUESTED, signIn)
  yield takeLatest(FETCH_COMPETITIONS_REQUESTED, fetchCompetitions)
  yield takeLatest(CREATE_COMPETITION_REQUESTED, createCompetition)
  yield takeLatest(CHANGE_COMPETITION_NAME_REQUESTED, changeCompetitionName)
  yield takeLatest(ERASE_COMPETITION_REQUESTED, eraseCompetition)
  yield takeLatest(ADD_COMPETITION_PARTICIPANT_REQUESTED, addCompetitionParticipant)
  yield takeLatest(REMOVE_COMPETITION_PARTICIPANT_REQUESTED, removeCompetitionParticipant)
  yield takeLatest(SEND_MAIL_REQUESTED, sendMailWithParticipants)
  yield takeLatest(USER_SIGNOUT_REQUESTED, signOut)
}

export default mySaga