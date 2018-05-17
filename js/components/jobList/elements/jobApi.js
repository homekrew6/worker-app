import api from '../../../api/index'
class jobApi {

	
	static availableJobs(id, timeZone) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/getJobListingForWorker', { "workerId": id, "timeZone": timeZone }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			});
		})
	}

	static declineJob(jobId, workerId, serviceId, language) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/declineJob', { "jobId": jobId, "serviceId": serviceId, "workerId": workerId, "language": language }).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}

	static acceptJob(jobId, workerId, customerId, language) {
		return new Promise((resolve, reject) => {
			api.post('Jobs/acceptJob', { "id": jobId, "status": "ACCEPTED", "workerId": workerId, "customerId": customerId, "language": language}).then(responseJson => {
				resolve(responseJson)
			}).catch(err => {
				reject(err)
			})
		})
	}
}

export default jobApi
