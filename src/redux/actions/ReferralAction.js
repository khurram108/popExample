import { baseURL } from "../assets/baseURL"
import {

    MY_REFERRALS,
    MY_REFERRALS_FAIL,
    MY_ACTIVE_REFERRALS

} from '../assets/constant'
import axios from 'axios'
import Cookies from 'js-cookie'

export function get_my_referrals(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_my_referrals', body)
            .then((resp) => {
                console.log(resp);

                if (resp) {
                    dispatch({
                        type: MY_REFERRALS,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: MY_REFERRALS_FAIL
                })
            })



    }
}

export function get_active_ref(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_referral_list', body)
            .then((resp) => {
                console.log(resp);

                if (resp) {

                    dispatch({
                        type: MY_ACTIVE_REFERRALS, 
                        payload: resp.data.data
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: MY_REFERRALS_FAIL
                })
            })



    }
}
