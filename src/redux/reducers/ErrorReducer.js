import {
    REGISTER_ERROR,
    LOGIN_ERROR,
    CLEAR_ERRORS,
    ADD_WEBSITE_FAIL,
    ADD_CASHOUT_FAIL,
    lOADING_ERROR,
    ACC_NOT_ACTIVATED,
    INVALID_EMAIL,
    EMAIL_SENT,
    PASSWORD_CHANGED,
    PASSWORD_CHANGED_SUCCESS,
} from '../assets/constant'
import { register } from '../actions/AuthAction';


let initState = {
    loginError: null,
    registerError: null,
    add_website_fail: null,
    cashout_fail: null,
    loadingError: null,
    not_activated_error: null,
    invalidEmail: null,
    email_sent_success: null,
    password_changed_success: null,
    password_changed_successfully: null,
}

export default function (state = initState, action) {

    switch (action.type) {
        case REGISTER_ERROR:
            console.log("it works");
            return {
                registerError: "Email Already Registered!"
            }


        // break;
        case LOGIN_ERROR:
            return {
                loginError : action.payload
            }

        case ADD_WEBSITE_FAIL:
            return {
                add_website_fail : "Website adding Fail, Please Try again."
            }
        case ACC_NOT_ACTIVATED:
            return {
                not_activated_error : "Your Account is not activated yet. Please check your email and activate your account."
            }


        case ADD_CASHOUT_FAIL:
            return {
                cashout_fail : "You don't have enough balance."
            }


        case lOADING_ERROR:

            return {
                loadingError : "Enable to Load Please Check your internet connection."
            }



        case INVALID_EMAIL:

            return {
                invalidEmail : "Invalid Email. Please check your email and try again."
            }

        case EMAIL_SENT:

            return {
                email_sent_success : "Reset Token has been sent to your email."
            }
        case PASSWORD_CHANGED:
            
            return {
                password_changed_success : "Reset Token has been sent to your email."
            }
        case PASSWORD_CHANGED_SUCCESS:
            console.log("worksss");
            return {
                password_changed_successfully : "Your Password has been successfully changed."
            }



        case CLEAR_ERRORS:
            return {
                registerError: null,
                loginError: null,
                add_website_fail: null,
                cashout_fail: null,
                not_activated_error: null,
                loadingError: null,
                invalidEmail: null,
                email_sent_success: null,
                password_changed_success: null,
                password_changed_successfully: null,
            }

        default:
            break;

    }
    return state

}