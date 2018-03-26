import React from "react";
import App from "./js/App";
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from "react-native-fcm";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from './js/api/';
import { checkAuth } from './js/components/accounts/elements/authActions';

export class App1 extends React.Component {
state = {isReady: false};

//cNaIevCArCw:APA91bGCt_6yxqI30Q0wS9dO2VkBo5AmEMyu3jFlrrhjTiOBcvdDcHx0VnzQ5nkWujqYCD5WFuh2rkbTq7FkdQMVtDB6fR-rCeWnJOSPBhxeyUsZN16PZL_1mUVZxy2nf1VV6g-OJ1FY

componentDidMount(){
  FCM.requestPermissions();
  FCM.getFCMToken().then(token => {
    console.log("TOKEN (getFCMToken)", token);
    this.props.checkAuth((res) => {
      console.log(res);
      if (res) {
      api.put(`Workers/editWorker/${res.userId}?access_token=${res.id}`, { deviceToken: token}).then((resEdit) => {
      }).catch((err) => {
        });
      }
    },(err)=>{
      console.log(err);
    });
  });
  
  // This method get all notification from server side.
  FCM.getInitialNotification().then(notif => {
    console.log("INITIAL NOTIFICATION", notif)
  });
  
  this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
    console.log("a", notif);
    if (notif && notif.local_notification) {
      return;
    }
    this.sendRemote(notif);
  });
  
  // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
  this.refreshUnsubscribe = FCM.on(FCMEvent.Notification, token => {
    console.log("TOKEN (refreshUnsubscribe)", token);
     FCM.getFCMToken().then(token => {
       console.log("TOKEN (getFCMToken)", token);
       this.props.checkAuth((res) => {
         console.log(res);
         if (res) {
         api.put(`Workers/editWorker/${res.userId}?access_token=${res.id}`, { deviceToken: token}).then((resEdit) => {
         }).catch((err) => {
           });
         }
       },(err)=>{
         console.log(err);
       });
     });
  });

}

sendRemote(notif) {
  console.log('notify sent', notif);
  FCM.presentLocalNotification({
    id: new Date().valueOf().toString(),
    title: notif.fcm.body,
    body: notif.fcm.body,
    ticker: notif.fcm.body,
    priority: "high",
    click_action: notif.click_action,
    show_in_foreground: true,
    local: true,
    vibrate: 300,
    wake_screen: true,
    lights: true,
    auto_cancel: true,
    group: "group",
    icon: "ic_launcher", 
    large_icon: "ic_launcher",
    data: { screenType: 'cleaner' },
    //picture: "https://image.freepik.com/free-icon/small-boy-cartoon_318-38077.jpg", 
    // android_actions: JSON.stringify([{
    //   id: "view",
    //   title: 'view'
    // },{
    //   id: "dismiss",
    //   title: 'dismiss'
    // }])
  });
}

  render() {
    return <App />;
  }
}


App1.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
 checkAuth: cb => dispatch(checkAuth(cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App1);