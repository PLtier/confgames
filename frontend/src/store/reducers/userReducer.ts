import { USER_SIGNIN_SUCCEEDED, USER_SIGNIN_FAILED, USER_SIGNOUT_SUCCEDDED } from "../actions"
import { UserState, SignInAction } from "../../types"
import { Action } from "redux"

const initialState: UserState = {
  isAuthenticated: false,
  signInError: false,
  username: ''
}

const userReducer = (state: UserState = initialState, action: SignInAction): UserState => {
    switch (action.type) {
      case USER_SIGNIN_SUCCEEDED:
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username
          }
      case USER_SIGNOUT_SUCCEDDED:
        return {
          ...state,
          isAuthenticated: false,
          signInError: false,
          username: ''
        }
      case USER_SIGNIN_FAILED:
          return {
            ...state,
            signInError: true
          }
      default:
        return state
    }
}

export default userReducer