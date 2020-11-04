import { baseURL } from "../assets/baseURL"
import {
    ALL_STATISTICS,
    ALL_REPORTS,
    RESULT_CUSTOME_DATE
} from '../assets/constant'
import axios from 'axios'




export function getAllStatistics(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_statistics', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    dispatch({
                        type: ALL_STATISTICS,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {

            })



    }
}
export function getStatisticsByCustomDate(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_statistics_custom_date', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    console.log(resp);
                    dispatch({
                        type: RESULT_CUSTOME_DATE,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {

            })



    }
}

export function getAllReport(body) {

    return dispatch => {

        axios.post(baseURL + '/routes/get_reports', body)
            .then((resp) => {

                console.log(resp);
                if (resp) {

                    dispatch({
                        type: ALL_REPORTS,
                        payload: resp.data
                    })
                }
            })
            .catch(err => {

            })



    }
}