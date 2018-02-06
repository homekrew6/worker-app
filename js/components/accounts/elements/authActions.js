import authApi from './authApi'
import * as TYPES from '../../../actions/actionTypes'
import {AsyncStorage} from 'react-native'
export function login(email,password){
  alert(email);
  //console.log(email , password);
  return function(dispatch){
    dispatch(authStateBusy())
    return authApi.login(email,password).then(res=>{
      //console.log(res)
      // if(res.status!=='success'){
      //   dispatch(authStateFailed())
      // }else{
      //   AsyncStorage.setItem('userData',JSON.stringify(res.data),(err,result)=>{
      //     AsyncStorage.getItem('userData',(err,result)=>{
      //
      //     })
      //   })
      //   dispatch(authStateSuccess(res.data))
      // }
      console.log(res);
      console.log(res.json());
      //console.log(res.json());
      if(res.status === 200){
        res.json().then((result)=> {
            console.log(result);
            dispatch(authStateSuccess(result.id))

        }).catch((err)=>{
          console.log(err)
        });
        return res
      }else{
        dispatch(authStateFailed())
        return res
      }

    }).catch(err=>{
      dispatch(authStateFailed())
      return err
    })
  }
}


export function authStateBusy(){
	return {
		type : TYPES.AUTH_STATE_BUSY
	}
}

export function authStateFailed(){
  return {
    type : TYPES.AUTH_STATE_FAILED
  }
}

export function authStateSuccess(data){
  return {
    type : TYPES.AUTH_STATE_SUCCESS,
    data
  }
}
