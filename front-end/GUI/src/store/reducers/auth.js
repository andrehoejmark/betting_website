import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'


const initialState = {
    token: null,
    error: null,
    loading: false,

    waiting_bankID: false,
    waiting_bankID_start_time: 0,
    autoStartToken: null,
    orderRef: null,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const authCancelBankID = (state, action) => {
    return updateObject(state, {
        waiting_bankID: false
    })
}

const authRestoreBankID = (state, action) => {
    return updateObject(state, {
        waiting_bankID: true
    })
}


const authWaitingBankID = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: null,

        waiting_bankID: true,
        orderRef: action.order_ref,
        autoStartToken: action.autoStartToken,
        waiting_bankID_start_time: Date.now()
    })
}

const authSuccessBankID = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false,
        token: null,

        waiting_bankID: false,
        orderRef: null
    })
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        waiting_bankID: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    })
}



const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionTypes.AUTH_WAITING_BANKID: return authWaitingBankID(state, action)
        case actionTypes.AUTH_SUCCESS_BANKID: return authSuccessBankID(state, action)
        case actionTypes.AUTH_CANCEL_BANKID: return authCancelBankID(state, action)
        case actionTypes.AUTH_RESTORE_BANKID: return authRestoreBankID(state, action)
        default: return state
    }
}

export default reducer