import {combineReducers} from 'redux'
import auth from '../components/accounts/elements/authReducer'
import location from '../components/location/elements/locationReducer'
import CheckBox from './ReducerCheckBox';
import WeekData from './ReducerWeek';
import payment from '../components/payment/elements/paymentReducer';
import availableJobs from '../components/jobList/elements/jobReducer'
import RouterOwn from './routerReducer';

const rootReducer = combineReducers({
	auth,
	location,
	CheckBox,
	WeekData,
	payment,
	availableJobs,
	RouterOwn
})

export default rootReducer
