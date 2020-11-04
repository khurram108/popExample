import {
    ALL_WEBSITES,
    ADD_WEBSITE
} from '../assets/constant'
import Cookies from 'js-cookie'
import history from '../../components/utils/history'


let initState = {
    allWebsites: [],
    currentWebsite: null
}

export default function (state = initState, action) {

    switch (action.type) {
        case ALL_WEBSITES:
            return {
                allWebsites: action.payload
            }
        case ADD_WEBSITE:
            console.log(action.payload);
            return {
                ...state,
                currentWebsite: action.payload
            }

        default:
            return state

    }



}