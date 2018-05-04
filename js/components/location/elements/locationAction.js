import locationApi from './locationApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'
export function allLocation() {
    return function (dispatch) {
        dispatch(locationStateBusy())
        return locationApi.allLocation().then(res => {
            let i
            for (i = 0; i < res.length; i++) {
                res[i].selected = false;
            }
            dispatch(locationStateSuccess(res));
            res.type = 'success';

            return res;

        }).catch(err => {
            err.type = 'error';
            dispatch(locationStateFailed());
            return err;
        })
    }
}


export function selectedLocation(workerID) {
    return function (dispatch) {
        dispatch(myLocationStateBusy())
        return locationApi.myLoaction(workerID).then(res => {
            dispatch(myLocationStateSuccess(res));
            res.type = 'success';

            return res;

        }).catch(err => {
            err.type = 'error';
            dispatch(myLocationStateFailed());
            return err;
        })
    }
}

export function checkUncheck(id, data) {
    return function (dispatch) {
        dispatch(checkUncheckStateBusy())
        let newData = data.map((data, key) => {
            if (data.id === id) {
                data.selected = !data.selected;
            }
            return data
        })


        //dispatch(checkUncheckStateSuccess(newData));
        //return newData;
    }
}

export function clearMyLocation(id) {
    return function (dispatch) {
        dispatch(clearMyLocationStateBusy());
        return locationApi.clearMyLocation(id).then(res => {          
            dispatch(clearMyLocationStateSuccess());
            return res;

        }).catch(err => {
            err.type = 'error';
            //console.log(err);
            dispatch(clearMyLocationStateFailed());
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

export function locationStateSuccess(data, selectedData) {
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
        type: TYPES.MYLOCATION_STATE_FAILED
    }
}

export function myLocationStateSuccess(data, selectedData) {
    return {
        type: TYPES.MYLOCATION_STATE_SUCCESS,
        data,
        selectedData
    }
}

export function checkUncheckStateBusy() {
    return {
        type: TYPES.CHECK_UNCHECK_STATE_BUSY
    }
}

export function checkUncheckStateFailed() {
    return {
        type: TYPES.CHECK_UNCHECK_STATE_FAILED
    }
}

export function checkUncheckStateSuccess(data) {
    return {
        type: TYPES.CHECK_UNCHECK_STATE_SUCCESS,
        data
    }
}

export function clearMyLocationStateBusy() {
    return {
        type: TYPES.CLEAR_MY_LOCATION_STATE_BUSY
    }
}

export function clearMyLocationStateFailed() {
    return {
        type: TYPES.CLEAR_MY_LOCATION_STATE_FAILED
    }
}

export function clearMyLocationStateSuccess() {
    return {
        type: TYPES.CLEAR_MY_LOCATION_STATE_SUCCESS
    }
}