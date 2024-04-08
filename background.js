//  background


// קוד המאזין להודעות מהתוסף
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "setReminder") {
    const { dateTime, message } = request;

    // Sending a POST request to the server
    fetch('http://localhost:3000/addRemainder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time: dateTime, message: message }),
      mode: 'cors' // Setting the request type to CORS
    })
      .then(response => {
        // Check if response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Return the response for further processing
        return response.text();
      })
      .then(result => {
        console.log('Reminder set:', result);

        chrome.notifications.create("", {
          type: "basic",
          iconUrl: "assets/hello_extensions.png",
          title: "Reminder",
          message: message,
        });
        sendResponse(result);
      })
      .catch(error => {
        console.error('Error setting reminder:', error);
        sendResponse({ error: error.message }); // Send an error to the plugin
      });

    return true;
  }
});


console.log("come to here");
// פונקציה לבדיקת התראות מהשרת והצגתן
function checkRemindersAndDisplayNotifications() {
  // const currentTime = new Date().getTime();
  // const requestData = { time: currentTime };


  // שליפת התראות מהשרת לפי הזמן הנוכחי
  fetch('http://localhost:3000/getRemindersOnTime', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ time: new Date().toISOString().slice(0, 19).replace('T', ' ') }),
    mode: 'cors' // הגדרת סוג הבקשה ל- CORS
  })
    .then(response => {
      console.log('Received response from server:', response); // הדפסת התגובה מהשרת
      return response.json()
    })
    .then(data => {
      const currentTime = new Date();
      // console.log(data)
         data.forEach(reminder => {

        const reminderTime = new Date(reminder.time);
        // console.log("the time is same" +reminderTime.getFullYear()+ currentTime.getFullYear() )

        if( reminderTime.getFullYear() === currentTime.getFullYear() &&
        reminderTime.getMonth() === currentTime.getMonth() &&
        reminderTime.getDate() === currentTime.getDate() &&
        reminderTime.getHours() === currentTime.getHours() &&
        reminderTime.getMinutes() === currentTime.getMinutes()
    ){
          chrome.notifications.create("", {
            type: "basic",
            iconUrl: "assets/hello_extensions.png",
            title: "Reminder",
            message: reminder.message,
          });
        }
      });
    })
    .catch(error => {
      console.error('Error retrieving reminders:', error);
    });
}

function startReminderChecking() {
  setInterval(checkRemindersAndDisplayNotifications, 30000); 
}
startReminderChecking();


