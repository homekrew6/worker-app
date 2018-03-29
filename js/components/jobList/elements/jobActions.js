import jobApi from './jobApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'



export function setNewData(data) {
  return function (dispatch) {
    console.log('setNewData', data);
    dispatch(serviceStateSuccess(data));
  };
}


export function availablejobs(id) {
  return function (dispatch) {
      dispatch(availableJobStateBusy())
      return jobApi.availableJobs(id).then(res => {
        dispatch(availableJobStateSuccess(res))
      return res

    }).catch(err => {
      err.type = 'error';
      console.log(err)
        dispatch(availableJobStateFailed())
      return err
    })
  }
}


export function availableJobStateBusy() {
  return {
    type: TYPES.AVAILABLEJOB_STATE_BUSY
  }
}

export function availableJobStateFailed() {
  return {
    type: TYPES.AVAILABLEJOB_STATE_FAILED
  }
}

export function availableJobStateSuccess(data) {
  return {
    type: TYPES.AVAILABLEJOB_STATE_SUCCESS,
    data
  }
}
