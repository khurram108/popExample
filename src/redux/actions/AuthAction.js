import { baseURL } from "../assets/baseURL"
import {
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_ERROR,
    CLEAR_ERRORS,
    LOGIN_ERROR,
    USER_PROFILE,
    USER_PROFILE_UPDATED,
    SUCCESS,
    ACC_NOT_ACTIVATED,
    INVALID_EMAIL,
    EMAIL_SENT,
    PASSWORD_CHANGED,
    PASSWORD_CHANGED_SUCCESS,
    GENERAL_UPDATES,
    SUCCESS_BILLING,
    FAILED_PASSWORD
} from '../assets/constant'
import axios from 'axios'


export function register(body) {

    return dispatch => {



        axios.post(baseURL + '/routes/register_user', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {
                    if (resp.data == "User already exist") {
                        console.log(resp);
                        dispatch({
                            type: REGISTER_ERROR
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }

                    dispatch({
                        type: REGISTER_USER,
                        payload: resp.data.user
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: REGISTER_ERROR
                })
            })



    }
}
export function login(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/login', body)
            .then((resp) => {

                if (resp) {
                    console.log(resp);

                    if (resp.data == "please enter all fields") {
                        console.log(resp);
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: resp.data
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }
                    if (resp.data == "User does not exist") {
                        console.log(resp);
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: resp.data
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }
                    if (resp.data == "Invalid Credentials") {
                        console.log(resp);
                        dispatch({
                            type: LOGIN_ERROR,
                            payload: resp.data
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }
                    if (resp.data == "Your Account is not activated yet.") {
                        console.log(resp);
                        dispatch({
                            type: ACC_NOT_ACTIVATED,
                            payload: resp.data
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }
                    console.log(resp);
                    dispatch({
                        type: LOGIN_USER,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export function getProfile(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_user_profile', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {
                    dispatch({
                        type: USER_PROFILE,
                        payload: resp.data.user
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function updateProfileGen(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/update_userProfile/general', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {
                    dispatch({
                        type: GENERAL_UPDATES,

                    })
                    dispatch(getProfile({ userID: body.userID }))
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function updateProfileBilling(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/update_userProfile/billing', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {
                          
                    dispatch({
                        type: SUCCESS_BILLING,
                        payload: resp.data

                    })
                    dispatch(getProfile({ userID: body.userID }))
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function changePasswordFromProfile(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/update_userProfile/update_password', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    if(resp.data == "Your Password Has been Changed."){

                        dispatch({
                            type: SUCCESS,
                            payload: resp.data
                            
                        })
                    }
                    if(resp.data.errorMsg ){
                        dispatch({
                            type: FAILED_PASSWORD,
                            payload: resp.data.errorMsg
                            
                        })

                    }
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function changePassword(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/reset_new_password', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {
                    
                    dispatch({
                        type: PASSWORD_CHANGED_SUCCESS,
                        payload: resp.data

                    })
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function sendPasswordChangeRequest(body) {

    return dispatch => {
        console.log(body);
        axios.post(baseURL + '/routes/forgot_request', body) // email will goes in body
            .then((resp) => {

                console.log(resp);
                if (resp) {
                    if(resp.data.errorEmail){
                        
                        dispatch({
                            type: INVALID_EMAIL    
                        })
                        return true;
                    }
                    dispatch({
                        type: EMAIL_SENT,
                        payload: resp.data

                    })
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}