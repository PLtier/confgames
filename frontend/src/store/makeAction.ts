import { Action } from "../types"

const makeAction = (type: string) => {
    return (payload: any = {}): Action => ({
        type,
        payload
    })
}

export default makeAction