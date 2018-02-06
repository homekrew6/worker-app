import api from '../../../api/index'
class authApi {

	//login API call
	static login(email,password){
    return api.post('Admins/login',{email:email,password:password}).then(responseJson=>responseJson).catch(err=>err)
	}



}

export default authApi
