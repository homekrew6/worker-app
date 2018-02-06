import * as TYPES from '../../../actions/actionTypes'
import initialState from '../../../reducers/initialState'

export default function authReducer(state=initialState.auth,action){
	switch (action.type) {
		case TYPES.AUTH_STATE_BUSY:{
			return {
				loggedIn:false,
				busy:true,
				data:''
			}
		}
		case TYPES.AUTH_STATE_FAILED:{
			return {
				loggedIn:false,
				busy:false,
				data:''
			}
		}
		case TYPES.AUTH_STATE_SUCCESS:{
			return {
				loggedIn:true,
				busy:false,
				data:action.data
			}
		}
		default:
			return state
	}
}
