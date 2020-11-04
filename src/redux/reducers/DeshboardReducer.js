import {
    GET_ALL_EARNINGS
} from '../assets/constant'
import Cookies from 'js-cookie'


let initState = {
    deshboard_status: [],

}

export default function (state = initState, action) {

    switch (action.type) {
        case GET_ALL_EARNINGS:
            return {
                deshboard_status: action.payload
            }

        default:
            break;

    }

    return state

}