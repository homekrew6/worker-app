import {combineReducers} from 'redux'
import auth from '../components/accounts/elements/authReducer'
import location from '../components/location/elements/locationReducer'
import CheckBox from './ReducerCheckBox';
import WeekData from './ReducerWeek';
const rootReducer = combineReducers({
	auth,
	location,
	CheckBox,
	WeekData
})

export default rootReducer
