import {combineReducers} from 'redux'
import auth from '../components/accounts/elements/authReducer'
import location from '../components/location/elements/locationReducer'

const rootReducer = combineReducers({
	auth,
	location
})

export default rootReducer
