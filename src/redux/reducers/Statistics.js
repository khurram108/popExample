import {
    ALL_STATISTICS,
    ALL_REPORTS,
    RESULT_CUSTOME_DATE
} from '../assets/constant'
import Cookies from 'js-cookie'
import history from '../../components/utils/history'


let initState = {
    allStatistics: [],
    allReports: [],
    resultCustomDate: [],
}

export default function (state = initState, action) {

    switch (action.type) {
        case ALL_STATISTICS:
            return {
                ...state,
                allStatistics: action.payload
            }
        case ALL_REPORTS:
            return {
                ...state,
                allReports: action.payload
            }
        case RESULT_CUSTOME_DATE:
            return {
                ...state,
                resultCustomDate: action.payload
            }

        default:
            return state

    }



}