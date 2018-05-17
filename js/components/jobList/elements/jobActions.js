import jobApi from './jobApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'



export function setNewData(data) {
  return function (dispatch) {
    dispatch(serviceStateSuccess(data));
  };
  
}


export function declineJob(jobId, workerId, serviceId, language) {
  return function (dispatch) {
    return jobApi.declineJob(jobId, workerId, serviceId, language).then(res => {
      return res
    }).catch(err => {
      return err
    })
  }
}

export function acceptJob(jobId, workerId, customerId, language) {
  return function (dispatch) {
    return jobApi.acceptJob(jobId, workerId, customerId, language).then(res => {
      return res
    }).catch(err => {
      return err
    })
  }
}

export function availablejobs(id, timeZone) {
  return function (dispatch) {
    return jobApi.availableJobs(id, timeZone).then(res => {
      return res

    }).catch(err => {
      err.type = 'error';
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
