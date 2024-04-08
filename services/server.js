const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const { addReminder, getRemindersOnTime } = require('../controllers/RemaindersFunc')
const app = express.Router();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'html')));

app.post('/addRemainder', (req, res) => {
    const { time, message } = req.body;

    console.log(time)
    console.log(message)

    addReminder(time, message);
    res.send('succeed!')
})

app.post('/getRemindersOnTime', (req, res) => {
    // const { time } = req.body;
    // const formattedTime = new Date(time).toISOString().slice(0, 19).replace('T', ' ');

    // console.log("in server the time is:"+formattedTime);

    getRemindersOnTime( (err, reminders) => {
        if (err) {
            console.error('Error retrieving reminders:', err.message);
            res.status(500).json({ error: 'Error retrieving reminders' });
        } else {
            if (reminders !== null) { // בדיקה שה- reminders אינו null
                // console.log("Reminders retrieved successfully:", reminders);
                res.json(reminders);
            } else {
                console.log("No reminders found for the given time.");
                res.json([]); // או כל ערך ריק אחר שאתה מעדיף להחזיר
            }
        }
    });
});


module.exports = app;

