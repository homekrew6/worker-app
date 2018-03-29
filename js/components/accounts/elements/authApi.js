import api from '../../../api/index'
class authApi {

	//login API call
	static login(email, password) {
		return new Promise((resolve, reject) => {
			api.post('Workers/login', { email: email, password: password }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}

	static signup(name, email, password, phone) {
		return new Promise((resolve, reject) => {
			api.post('Workers/signup', { name: name, email: email, password: password, phone: phone, is_active: 0 }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}


	static getAllLanguagesList()
	{
		return new Promise((resolve, reject) => {
			api.get('Languages').then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}
	static getAllCurrencyList()
	{
		return new Promise((resolve, reject) => {
			api.get('Currencies').then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}
	static getUserDetail(id) {
		return new Promise((resolve, reject) => {
			api.get('Workers/' + id).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}






}

export default authApi
