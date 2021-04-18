/* eslint eqeqeq: 0 */
import * as actionTypes from "./actionTypes"
import axios from 'axios'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("expirationDate")

    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout
                )
        }, expirationTime * 1000)
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

// BankID
export const authWaitingBankID = (order_ref, autoStartToken) => {
    return {
        type: actionTypes.AUTH_WAITING_BANKID,
        order_ref: order_ref, 
        autoStartToken: autoStartToken
    }
}

export const authSuccessBankID = () => {
    return {
        type: actionTypes.AUTH_SUCCESS_BANKID
    }
}

export const cancelBankID = () => {
    return {
        type: actionTypes.AUTH_CANCEL_BANKID
    }
}

export const restoreBankID = () => {
    return {
        type: actionTypes.AUTH_RESTORE_BANKID
    }
}


export const authBankID = (personal_number, type_of_authentication) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/bankID/authenticate',{
            personal_number: personal_number,
            type_of_authentication: type_of_authentication
        }).then(res => {
            
            console.log("Response authBankID: " + res)
            console.log(res)
            if(res.data.orderRef){
                // Succesfully found their personal number and waiting for them to verify
                // on their phone with mobileID app
                const orderRef = res.data.orderRef
                const autoStartToken = res.data.autoStartToken
                dispatch(authWaitingBankID(orderRef, autoStartToken))
            }

            if(res.data.CODE){
                const code = res.data.CODE
                
                // The possibility that they made a request for you 
                if(code == "ALREADY_IN_PROGRESS"){
                    console.log("restoreBankID!")
                    dispatch(restoreBankID())
                }
            }
        }).catch(err => {
            console.log('error:' + err)
            dispatch(authFail(err))
        })
    }
}


export const statusBankID = (order_ref) => {
    return dispatch => {
        
        axios.post('http://127.0.0.1:8000/bankID/order-status',{
            order_ref: order_ref,
        }).then(res => {
            var code = res.data.CODE
            if(code == "NOT FOUND"){
                console.log("not found")
            }

            console.log("Response in react: ")
            console.log(res)
            if(res.status){
                if(res.status == "Completed"){
                    // They successfully verified identity with mobileID. Their information is now stored on server
                    // and when creating their account their real name is stored there already.
                    dispatch(authSuccessBankID())
                }
            }
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/accounts/login/',{
            username: username,
            password: password
        }).then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout(3600))
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authRegister = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://127.0.0.1:8000/accounts/signup/',{
            username: username,
            email: email,
            password1: password1,
            password2: password2
        }).then(res => {
            const token = res.data.key
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
            localStorage.setItem('token', token)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(token))
            dispatch(checkAuthTimeout(3600))
        }).catch(err => {
            dispatch(authFail(err))
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(token == undefined){
            dispatch(logout())
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(token))
                dispatch(checkAuthTimeout( (expirationDate.getTime()  - new Date().getTime())/1000))
            }
        }
    }
}

