const axios = require('axios')

async function sendPushNotification(expoPushToken, title, body, navigate, navigateData, username) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title,
      body,
      data: { navigate, navigateData, username },
    };
  
    await axios("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      data: message,
    })
      .then(data => console.log('Send Notification'))
      .catch(err => console.log(err.response.data))
      
  }

  module.exports = sendPushNotification