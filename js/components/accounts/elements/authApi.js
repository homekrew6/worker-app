import api from '../../../api/index'
class authApi {

	//login API call
	static login(email, password) {
		return new Promise((resolve, reject) => {
			api.post('Workers/login', { email: email, password: password }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				console.log(err);
				reject(err)
			})
		})
	}

	static signup(name, email, password, phone) {
		console.log('test');
		return new Promise((resolve, reject) => {
			api.post('Workers/signup', { name: name, email: email, password: password, phone: phone, is_active: 0 }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				console.log(err);
				reject(err)
			})
		})
	}

	static getUserDetail(id) {
		return new Promise((resolve, reject) => {
			api.get('Workers/' + id).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				console.log(err);
				reject(err)
			})
		})
	}






}

export default authApi
