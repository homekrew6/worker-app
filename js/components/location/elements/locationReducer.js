import * as TYPES from '../../../actions/actionTypes'
import initialState from '../../../reducers/initialState'

export default function lacationReducer(state = initialState.auth, action) {
    switch (action.type) {
        case TYPES.LOCATION_STATE_BUSY: {
            return {
                busy: true,
                data: '',
                selectedData: state.selectedData
            }
        }
        case TYPES.LOCATION_STATE_FAILED: {
            return {
                busy: false,
                data: '',
                selectedData: state.selectedData
            }
        }
        case TYPES.LOCATION_STATE_SUCCESS: {
            return {
                busy: false,
                data: action.data,
                selectedData: state.selectedData
            }
        }
        case TYPES.MYLOCATION_STATE_BUSY: {
            return {
                busy: true,
                data: state.data,
                selectedData: ''
            }
        }
        case TYPES.MYLOCATION_STATE_FAILED: {
            return {
                busy: false,
                data: state.data,
                selectedData: ''
            }
        }
        case TYPES.MYLOCATION_STATE_SUCCESS: {
            return {
                busy: false,
                data: state.data,
                selectedData: action.data
            }
        }
        default:
            return state
    }
}
