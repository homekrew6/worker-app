import {combineReducers} from 'redux'
import auth from '../components/accounts/elements/authReducer'

const rootReducer = combineReducers({
	auth
})

export default rootReducer
