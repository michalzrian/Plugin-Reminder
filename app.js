const router = require("./services/server");
const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.options('/addRemainder', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type'); // הוספת הכותרת 'Content-Type' לרשימת הכותרות המאושרות
    res.status(200).send();
});
app.options('/getRemindersOnTime', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type'); // הוספת הכותרת 'Content-Type' לרשימת הכותרות המאושרות
    res.status(200).send();
});

// app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // אפשר גישה מכל מקור, לשימוש מוחלט יש להחליף את הכוכבית בכתובת המתאימה
    next();
  });
  
app.use('', router);
app.listen(port, () => {
console.log(`Server running at http://localhost:${port}`);
});