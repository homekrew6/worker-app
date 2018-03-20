import {combineReducers} from 'redux'
import auth from '../components/accounts/elements/authReducer'
import location from '../components/location/elements/locationReducer'
import CheckBox from './ReducerCheckBox';
import WeekData from './ReducerWeek';
import payment from '../components/payment/elements/paymentReducer'
const rootReducer = combineReducers({
	auth,
	location,
	CheckBox,
	WeekData,
	payment
})

export default rootReducer
