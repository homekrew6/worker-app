import * as TYPES from '../../../actions/actionTypes'
import initialState from '../../../reducers/initialState'

export default function paymentReducer(state = initialState.auth, action) {
    switch (action.type) {
        case TYPES.PAYMENT_STATE_BUSY: {
            return {
                busy: true,
                data: ''
            }
        }
        case TYPES.PAYMENT_STATE_FAILED: {
            return {
                busy: false,
                data: ''
            }
        }
        case TYPES.PAYMENT_STATE_SUCCESS: {


            return {
                busy: false,
                data: action.data
            }
        }

        default:
            return state
    }
}
