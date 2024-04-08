// // popup.js
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById("set-reminder").addEventListener("click", function() {
//     const date = document.getElementById("reminder-date").value;
//     const time = document.getElementById("reminder-time").value;
//     const message = document.getElementById("reminder-message").value;

//     const dateTimeString = date + "T" + time + ":00";
//     const dateTime = new Date(dateTimeString);
//     // alert(dateTime);
//     // alert("try to change the vesion to 3")
//     if (isNaN(dateTime.getTime())) {
//       console.error("Invalid date/time provided");
//       return;
//     }
    
//     chrome.runtime.sendMessage({ action: "setReminder", dateTime: dateTime, message: message });
//   });
// });
// העמוד POPUP.HTML
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("set-reminder").addEventListener("click", function() {
      const date = document.getElementById("reminder-date").value;
      const time = document.getElementById("reminder-time").value;
      const message = document.getElementById("reminder-message").value;

      const dateTimeString = date + "T" + time + ":00";
      const dateTime = new Date(dateTimeString);

      if (isNaN(dateTime.getTime())) {
          console.error("Invalid date/time provided");
          return;
      }
      
      // שליחת הבקשה להוספת התראה והצגת ההתראה קופצת בצד
      chrome.runtime.sendMessage({ action: "setReminder", dateTime: dateTime, message: message }, function(response) {
          console.log('Reminder set:', response);
      });
  });
});



