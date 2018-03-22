import paymentApi from './paymentApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'
export function myPaymentList(workerId) {
    return function (dispatch) {
        console.log('test');
        dispatch(paymentStateBusy())
        return paymentApi.myPaymentList(workerId).then(res => {
            dispatch(paymentStateSuccess(res));
            res.type = 'success';

            return res;

        }).catch(err => {
            err.type = 'error';
            console.log(err);
            dispatch(paymentStateFailed());
            return err;
        })
    }
}


export function selectedLocation(workerID) {
    return function (dispatch) {
        console.log(workerID);
        dispatch(paymentStateBusy())
        return paymentApi.myLoaction(workerID).then(res => {
            console.log(res);
            dispatch(paymentStateSuccess(res));
            res.type = 'success';

            return res;

        }).catch(err => {
            err.type = 'error';
            console.log(err);
            dispatch(paymentStateFailed());
            return err;
        })
    }
}

export function checkUncheck(id, data) {
    console.log(data);
    return function (dispatch) {
        dispatch(paymentStateBusy())
        let newData = data.map((data, key) => {
            if (data.id === id) {
                data.selected = !data.selected;
            }
            return data
        });

        debugger;
        dispatch(paymentStateSuccess(newData));

        //dispatch(checkUncheckStateSuccess(newData));
        //return newData;
    }
}

export function clearMyLocation(id) {
    return function (dispatch) {
        dispatch(clearMyLocationStateBusy());
        return paymentApi.clearMyLocation(id).then(res => {
            console.log(res);
            dispatch(clearMyLocationStateSuccess());
            return res;

        }).catch(err => {
            err.type = 'error';
            console.log('error2');
            //console.log(err);
            dispatch(clearMyLocationStateFailed());
            return err;
        })
    }
}


export function paymentStateBusy() {
    return {
        type: TYPES.PAYMENT_STATE_BUSY
    }
}

export function paymentStateFailed() {
    return {
        type: TYPES.PAYMENT_STATE_FAILED
    }
}

export function paymentStateSuccess(data) {
    return {
        type: TYPES.PAYMENT_STATE_SUCCESS,
        data
    }
}

