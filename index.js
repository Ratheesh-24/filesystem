const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

// current timestamp in milliseconds, date, month, year, hours, minutes
let ts = Date.now();
let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
const data =
  "Date - " +
  year +
  "-" +
  month +
  "-" +
  date +
  ", Time - " +
  hours +
  ":" +
  minutes;

//Specifying destination file
const destinationFile = path.join("./output", "/current-date-time.txt");

async function loadApp() {
  try {
    
    // Enable CORS for all origin
    app.use(cors());

    // Purpose => Parse Request Body
    app.use(express.json());
    
    // Purpose => Logging, writing file
    app.use((req, res, next) => {
      console.log(`${req.url} ${req.method} at ${new Date()}`);
      fs.writeFileSync(destinationFile, data);
      res.send(data);
      next();
    });
 
    //Starting server
    app.listen(process.env.PORT || 3001, () => console.log(`Server listening at port 3001...`));
  }
  catch (err) {
    console.error(err);
    process.exit();
  }
}
loadApp();