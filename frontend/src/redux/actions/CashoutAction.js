import { baseURL } from "../assets/baseURL"
import {
    ADD_CASHOUT,
    ADD_CASHOUT_FAIL,
    ALL_CASHOUTS,
    ADD_CASHOUT_MSG_HIDE,
    CLEAR_ERRORS,
    DEPOSIT
} from '../assets/constant'
import axios from 'axios'
import Cookies from 'js-cookie'

export function addCashout(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/request_cashout', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    if (resp.data == "You don't have enough balance") {
                        console.log(resp);
                        dispatch({
                            type: ADD_CASHOUT_FAIL
                        })
                        setTimeout(() => {
                            dispatch({
                                type: CLEAR_ERRORS
                            })
                        }, 3000);

                        return true
                    }
                    if(resp.data.deposit){

                        dispatch({      
                            type: DEPOSIT,
                            payload: resp.data.deposit
                        })
                    }
                    if(resp.data.withdraw){

                        dispatch({      
                            type: ADD_CASHOUT,
                            payload: resp.data.withdraw
                        })
                    }
                    setTimeout(() => {
                        dispatch({
                            type: ADD_CASHOUT_MSG_HIDE,
                        })

                    }, 3000);
                }

            }).then(() => {
                dispatch(getAllCashouts())
                dispatch(hideMsgs())
            })
            .catch(err => {
                dispatch({
                    type: ADD_CASHOUT_FAIL
                })
            })



    }
}
export function getAllCashouts(body) {

    return dispatch => {
        let user = JSON.parse(Cookies.get("user"))
        if (!body) {
            body = { userID: user._id }
        }

        axios.post(baseURL + '/routes/get_all_cashouts', body)
            .then((resp) => {

                if (resp) {
                    console.log(resp);
                    dispatch({
                        type: ALL_CASHOUTS,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function hideMsgs() {

    return dispatch => {
        setTimeout(() => {
            dispatch({
                type: ADD_CASHOUT_MSG_HIDE,
            })
            dispatch({
                type: CLEAR_ERRORS
            })
            console.log("it works after 3 sec");
        }, 3000);


    }
}