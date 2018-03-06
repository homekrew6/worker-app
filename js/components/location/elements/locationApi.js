import api from '../../../api/index'
import { AsyncStorage } from 'react-native'
class locationApi {

    
    static allLocation() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('userToken', (err, result) => {
                console.log(result);
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

    // static signup(name, email, password, phone) {
    //     console.log('test');
    //     return new Promise((resolve, reject) => {
    //         api.post('Workers/signup', { name: name, email: email, password: password, phone: phone, is_active: 0 }).then(responseJson => {
    //             resolve(responseJson)
    //         }).catch(err => {
    //             console.log(err);
    //             reject(err)
    //         })
    //     })
    // }

    // static getUserDetail(id) {
    //     return new Promise((resolve, reject) => {
    //         api.get('Workers/' + id).then(responseJson => {
    //             resolve(responseJson)
    //         }).catch(err => {
    //             console.log(err);
    //             reject(err)
    //         })
    //     })
    // }






}

export default locationApi
