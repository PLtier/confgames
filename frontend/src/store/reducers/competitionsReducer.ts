import { FETCH_COMPETITIONS_SUCCEEDED, FETCH_COMPETITIONS_FAILED } from "../actions"
import { CompetitionsState, FetchCompetitonsSucceddedAction } from "../../types"

const initialState: CompetitionsState = {
  competitions: [],
  fetchError: false
}

const competitionsReducer = (state: CompetitionsState = initialState, action: FetchCompetitonsSucceddedAction): any => {
    switch (action.type) {
      case FETCH_COMPETITIONS_SUCCEEDED:
        return {
          ...state,
          fetchError: false,
          competitions: action.payload.competitions
          }
      case FETCH_COMPETITIONS_FAILED:
        return {
          ...state,
          fetchError: true
        }
      default:
        return state
    }
}

export default competitionsReducer