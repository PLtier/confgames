import { Action } from "../types"

const makeAction = (type: any) => {
    return (payload: any): Action => ({
        type,
        payload
    })
}

export default makeAction