import locationApi from './locationApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'
export function allLocation() {
    return function (dispatch) {
        dispatch(locationStateBusy())
        return locationApi.allLocation().then(res => {
            console.log(res);
            dispatch(locationStateSuccess(res));
            res.type = 'success';
            
            return res;

        }).catch(err => {
            err.type = 'error';
            console.log(err);
            dispatch(locationStateFailed());
            return err;
        })
    }
}


export function locationStateBusy() {
    return {
        type: TYPES.LOCATION_STATE_BUSY
    }
}

export function locationStateFailed() {
    return {
        type: TYPES.LOCATION_STATE_FAILED
    }
}

export function locationStateSuccess( data, selectedData ) {
    return {
        type: TYPES.LOCATION_STATE_SUCCESS,
        data,
        selectedData
    }
}

export function myLocationStateBusy() {
    return {
        type: TYPES.MYLOCATION_STATE_BUSY
    }
}

export function myLocationStateFailed() {
    return {
        type: MYTYPES.LOCATION_STATE_FAILED
    }
}

export function myLocationStateSuccess(data, selectedData) {
    return {
        type: TYPES.MYLOCATION_STATE_SUCCESS,
        data,
        selectedData
    }
}
