import { baseURL } from "../assets/baseURL"
import {

    ADD_WEBSITE,
    ADD_WEBSITE_FAIL,
    ALL_WEBSITES,
    WEBSITE_UPDATED
} from '../assets/constant'
import axios from 'axios'
import Cookies from 'js-cookie'

export function addWebsite(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/add_new_domain', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    dispatch({
                        type: ADD_WEBSITE,
                        payload: resp.data
                    })
                }
            }).then(() => {
                dispatch(getAllWebsites())
            })
            .catch(err => {
                dispatch({
                    type: ADD_WEBSITE_FAIL
                })
            })



    }
}
export function getAllWebsites(body) {

    return dispatch => {


        let user = JSON.parse(Cookies.get("user"))
        if (!body) {
            body = { userID: user._id }
        }

        axios.post(baseURL + '/routes/get_all_websites', body)
            .then((resp) => {

                if (resp) {
                    console.log(resp);
                    dispatch({
                        type: ALL_WEBSITES,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })



    }
}
export function changeStatusTo(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/update_website', body)
            .then((resp) => {

                if (resp) {
                    console.log(resp);
                    dispatch({
                        type: WEBSITE_UPDATED,
                        payload: resp.data
                    })
                }
            }).then(() => {
                dispatch(getAllWebsites())
            })
            .catch(err => {
                console.log(err);
            })



    }
}