import {
    ADD_CASHOUR,
    ALL_CASHOUTS,
    ADD_CASHOUT,
    ADD_CASHOUT_MSG_HIDE,
    DEPOSIT
} from '../assets/constant'
import Cookies from 'js-cookie'
import history from '../../components/utils/history'


let initState = {
    allCashouts: [],
    add_success_msg: null

}

export default function (state = initState, action) {

    switch (action.type) {
        case ALL_CASHOUTS:
            return {
                ...state,
                allCashouts: action.payload
            }
        case ADD_CASHOUT:

            return {
                ...state,
                add_success_msg: `Your request has been sent to Admin for the withdraw $${action.payload.amount}. Please wait for the approval from Admin.`
            }
        case DEPOSIT:

            return {
                ...state,
                deposit_msg: `Your request has been sent to Admin for the deposit $${action.payload.amount}. Please wait for the approval from Admin.`
            }
        case ADD_CASHOUT_MSG_HIDE:

            return {
                ...state,
                add_success_msg: ""
            }

        default:
            return state

    }



}