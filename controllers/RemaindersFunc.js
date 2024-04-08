
const sqlite3 = require('sqlite3').verbose();

function addReminder(time, message) {

    const db = new sqlite3.Database('C:/sqlite/reminders.db');

    const sql = `INSERT INTO reminders (time, message) VALUES (?,?)`;

    db.run(sql, [time, message], function(err) {
        if (err) {
            console.error('Error adding reminders:', err.message);
        } else {
            console.log(message)
            console.log('Reminder added successfully!');
        }
    });

    db.close();
}
// function getRemindersOnTime(time, callback) {
//     // const formattedTime = new Date(time).toISOString().slice(0, 19).replace('T', ' ');
//     // console.log("the time send is "+formattedTime);
//     // const sqlite3 = require('sqlite3').verbose();
//     console.log(time)
//     const db = new sqlite3.Database('C:/sqlite/reminders.db');

//     const sql = `SELECT * FROM reminders WHERE time = ?`;
//     db.all(sql, [time], function(err, rows) {
//         rows.forEach(row => {
//             console.log("Time in database: " + row.time);
//         });
//         if (err) {
//             console.error('Error retrieving messages:', err.message);
//             callback(err, null);
//         } else {
//             console.log("rows: ", JSON.stringify(rows));
//             callback(null, rows ? rows : null);
//         }
//         db.close();
//     });

// }
function getRemindersOnTime( callback) {
    const db = new sqlite3.Database('C:/sqlite/reminders.db');
    const sql = `SELECT * FROM reminders`;
    
    db.all(sql, function(err, rows) {
        if (err) {
            console.error('Error retrieving reminders:', err.message);
            callback(err, null);
        } else {
            // console.log("Reminders retrieved successfully:", rows);
            callback(null, rows ? rows : null);
        }
        db.close();
    });

}


module.exports = {
    addReminder,
    getRemindersOnTime,
};