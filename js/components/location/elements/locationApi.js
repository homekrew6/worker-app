import api from '../../../api/index'
import { AsyncStorage } from 'react-native'
class locationApi {

    
    static allLocation() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('userToken', (err, result) => {
                if (!err){
                    api.get('Zones?access_token=' + JSON.parse(result).id).then((res) => {
                        resolve(res)
                        
                    }).catch((err) => {                       
                        reject(err);
                    });
                }else{
                    reject(err);
                }
                
            });
        })
    }

    static myLoaction( workerID ) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('userToken', (err, result) => {
                let workerInclude = '{"include":["zone"]}';
                if (!err) {
                    api.get('Workers/' + workerID + '/workerLocations?filter=' + workerInclude +'&'+ 'Zones?access_token=' + JSON.parse(result).id).then((res) => {
                    // api.get('Zones?access_token=' + JSON.parse(result).id).then((res) => {  
                        resolve(res)

                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(err);
                }

            });
        })
    }


    static clearMyLocation(id) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('userToken', (err, result) => {
                if (!err) {
                    api.delete('Workers/' + id + '/workerLocations?' + 'access_token=' + JSON.parse(result).id).then((res) => { 
                        resolve(res)

                    }).catch((err) => {
                        reject(err);
                    });
                } else {
                    reject(err);
                }
            })
        })
    }
}

export default locationApi
