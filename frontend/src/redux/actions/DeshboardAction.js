import { baseURL } from "../assets/baseURL"
import {
    GET_ALL_EARNINGS,
    lOADING_ERROR
} from '../assets/constant' 
import axios from 'axios'

export function earningStatus(body) {

    return dispatch => {



        axios.post(baseURL + '/routes/get_all_earnings', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    dispatch({
                        type: GET_ALL_EARNINGS,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: lOADING_ERROR
                })
            })



    }
}
// export function login(body) {

//     return dispatch => {

//         axios.post(baseURL + '/routes/login', body)
//             .then((resp) => {

//                 if (resp) {
//                     console.log(resp);
//                     dispatch({
//                         type: LOGIN_USER,
//                         payload: resp.data
//                     })
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             })



//     }
// }