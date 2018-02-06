import { AsyncStorage } from "react-native";
import config from '../config'
let headers = {
  'Accept':'application/json',
  'Content-Type': 'application/json',
}

const resolver = ()=>AsyncStorage.getItem('userData',(err,result)=>{

  if(result){
    result = JSON.parse(result);
    headers.Authorization = 'Bearer '+result.api_token
  }
})
//headers.Authorization = 'Bearer tdsiUzrbkMWy3HcVoB4UPaTxgDdxTpXeJduwkWKpiOX6XtZKYPBvJAsTXv9M';

class api {
  static post(endpoint,data){
    console.log(config.base_api+endpoint)
    return resolver().then(()=>{
      return fetch(config.base_api+endpoint,{
        method:'POST',
        headers:headers,
        body:JSON.stringify(data)
      }).then(response => {
        //console.log(response.json())
        return response
      }).catch(error=>error)
    }).catch(err=>err)
  }

  static get(endpoint){
    console.log(config.base_api+endpoint)
    return resolver().then(()=>{
      return fetch(config.base_api+endpoint,{
        method:'GET',
        headers:headers
      }).then(response => response.json()).catch(error=>{

      })
    }).catch(error=>error)
  }
}

export default api
