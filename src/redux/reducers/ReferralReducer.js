import {
    MY_REFERRALS,
    MY_ACTIVE_REFERRALS
} from '../assets/constant'
import Cookies from 'js-cookie'


let initState = {
    referral: [],
    referral_list: [],

}

export default function (state = initState, action) {

    switch (action.type) {
        case MY_REFERRALS:
            return {
                ...state,
                referral: action.payload
            }
        case MY_ACTIVE_REFERRALS:
            return {
                ...state,
                referral_list: action.payload
            }

        default:
            break;

    }

    return state

}