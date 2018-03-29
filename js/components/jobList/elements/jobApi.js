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

	static declineJob(jobId, workerId) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/acceptJob', { "id": jobId, "status": "DECLINED", "workerId": workerId }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}

	static acceptJob(jobId, workerId) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/acceptJob', { "id": jobId, "status": "ACCEPTED", "workerId": workerId }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default jobApi
