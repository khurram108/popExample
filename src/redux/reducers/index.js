import { combineReducers } from 'redux'
import ErrorReducer from './ErrorReducer'
import AuthReducer from './AuthReducer'
import WebsiteReducer from './WebsitesReducer'
import CashoutReducer from './CashoutReducer'
import DeshboardReducer from './DeshboardReducer'
import ReferralReducer from './ReferralReducer'
import Statistics from './Statistics'

let allReducer = {
    ErrorReducer,
    AuthReducer,
    WebsiteReducer,
    CashoutReducer,
    DeshboardReducer,
    ReferralReducer,
    Statistics
}


let rootReducer = combineReducers(allReducer)

export default rootReducer