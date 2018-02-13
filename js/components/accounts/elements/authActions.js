import authApi from './authApi'
import * as TYPES from '../../../actions/actionTypes'
import { AsyncStorage } from 'react-native'
export function login(email, password) {
  return function (dispatch) {
    dispatch(authStateBusy())
    return authApi.login(email, password).then(res => {

      AsyncStorage.setItem('userToken', JSON.stringify(res), (err, result) => {
        AsyncStorage.getItem('userToken', (err, result) => {
          console.log(result);
        })
      })
      res.type = 'success';
      //dispatch(authStateSuccess(res))
      return res

    }).catch(err => {
      err.type = 'error';
      console.log(err)
      dispatch(authStateFailed())
      return err
    })
  }
}

export function getUserDetail(id, auth) {
  return function (dispatch) {
    dispatch(authStateBusy())
    return authApi.getUserDetail(id, auth).then(res => {
      res.type = 'success';
      console.log(res);
      dispatch(authStateSuccess(res))
      return res

    }).catch(err => {
      err.type = 'error';
      console.log(err)
      dispatch(authStateFailed())
      return err
    })
  }
}

export function signup(name, email, password, phone) {
  return function (dispatch) {
    dispatch(authStateBusy())
    return authApi.signup(name, email, password, phone).then(res => {
      res.type = 'success';
      console.log(res);
      dispatch(authStateSuccess(res))
      return res

    }).catch(err => {
      err.type = 'error';
      console.log(err)
      dispatch(authStateFailed())
      return err
    })
  }
}

export function checkAuth(cb) {
  return function (dispatch) {
    dispatch(authStateBusy())
    AsyncStorage.getItem('userToken', (err, result) => {
      if (result) {
        const data = JSON.parse(result)
        dispatch(authStateSuccess(data))
        cb(data)
      } else {
        dispatch(authStateFailed())
        cb(false)
      }
    })
  }
}

export function logout(cb) {
  return function (dispatch) {
    dispatch(authStateBusy())
    AsyncStorage.removeItem('userToken', (err, res) => {
      dispatch(authStateFailed())
      cb(true)
    })
  }
}


export function authStateBusy() {
  return {
    type: TYPES.AUTH_STATE_BUSY
  }
}

export function authStateFailed() {
  return {
    type: TYPES.AUTH_STATE_FAILED
  }
}

export function authStateSuccess(data) {
  return {
    type: TYPES.AUTH_STATE_SUCCESS,
    data
  }
}
