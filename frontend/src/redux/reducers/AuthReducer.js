import {
    REGISTER_USER,
    LOGIN_USER,
    USER_PROFILE,
    SUCCESS,
    GENERAL_UPDATES,
    SUCCESS_BILLING,
    FAILED_PASSWORD

} from '../assets/constant'
import Cookies from 'js-cookie'
import history from '../../components/utils/history'


let initState = {
    userDetail: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
    successMsg: null
}

export default function (state = initState, action) {

    switch (action.type) {
        case REGISTER_USER: 
            setTimeout(() => {
                history.push("/login")
            }, 1000);
            break;
        case LOGIN_USER:
            Cookies.set("user", action.payload.user)
            Cookies.set("notification", "Congratulations! your registration has been completed.")
            setTimeout(() => {
                history.push("/")
            }, 1000);
            return {
                userDetail: action.payload.user
            }
        case USER_PROFILE:
            Cookies.set("user", action.payload)

            return {
                userDetail: action.payload
            }

        case SUCCESS:
            return {
                ...state,
                successMsg: action.payload,
            }

        case SUCCESS_BILLING:
            return {
                ...state,
                successMsgBilling: "Your billing details has been updated.",
            }

        case FAILED_PASSWORD:
            return {
                ...state,
                failMsgPassword: action.payload,
            }
        case GENERAL_UPDATES:
            setTimeout(() => {
                return {
                    ...state,
                    generalProfile: null
                }

            }, 3000);
            return {
                ...state,
                generalProfile: "Your profile has been Updated."
            }




        default:
            return state

    }



    return state
}