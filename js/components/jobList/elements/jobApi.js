import api from '../../../api/index'
class jobApi {

	
	static availableJobs(id) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/getJobListingForWorker', { "workerId": id }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default jobApi
