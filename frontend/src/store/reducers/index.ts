import { combineReducers } from "redux"
import userReducer from "./userReducer"
import competitionsReducer from "./competitionsReducer"

const rootReducer = combineReducers({
    user: userReducer,
    competitions: competitionsReducer
})

export default rootReducer;