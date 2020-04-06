import * as TYPES from '../actionTypes'
let INIT_STATE = {
    baseInfo: null
}

export default function person(state = INIT_STATE,action){
    state = JSON.parse(JSON.stringify(state));
    let payload = null;
    switch(action.type){
        case TYPES.PERSON_QUERY_INFO:
            payload = action.payload
            state.baseInfo = payload.data
            break;
    }
    return state
}