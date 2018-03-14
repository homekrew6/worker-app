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
            //console.log(action.data)
            let i;
            let newLocationArray = action.data;
            let selectedLocationId = []
            if (state.selectedData.length > 0 && action.data.length > 0){
                for (i = 0; i < state.selectedData.length; i++) {
                    selectedLocationId.push(state.selectedData[i].zoneId)
                }
                //console.log(selectedLocationId)
                if (selectedLocationId.length > 0){
                    let j;
                    for (j = 0; j < newLocationArray.length; j++) {
                        let locationSelectedCheck = selectedLocationId.indexOf(newLocationArray[j].id);
                        if (locationSelectedCheck > -1){
                            newLocationArray[j].selected = true
                        }else{
                            newLocationArray[j].selected = false
                        }

                    }
                }
                //console.log(newLocationArray);
            }
            
            return {
                busy: false,
                data: newLocationArray,
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
        case TYPES.CHECK_UNCHECK_STATE_BUSY: {
            return {
                busy: true,
                data: state.data,
                selectedData: state.selectedData
            }
        }
        case TYPES.CHECK_UNCHECK_STATE_FAILED: {
            return {
                busy: false,
                data: state.data,
                selectedData: state.selectedData
            }
        }
        case TYPES.CHECK_UNCHECK_STATE_SUCCESS: {
            return {
                busy: false,
                data: action.data,
                selectedData: state.data
            }
        }
        case TYPES.CLEAR_MY_LOCATION_STATE_BUSY: {
            return {
                busy: true,
                data: state.data,
                selectedData: state.selectedData

            }
        }
        case TYPES.CLEAR_MY_LOCATION_STATE_FAILED: {
            return {
                busy: false,
                data: state.data,
                selectedData: state.selectedData
            }
        }
        case TYPES.CLEAR_MY_LOCATION_STATE_SUCCESS: {
            return {
                busy: false,
                data: state.data,
                selectedData: state.selectedData
            }
        }
        default:
            return state
    }
}
