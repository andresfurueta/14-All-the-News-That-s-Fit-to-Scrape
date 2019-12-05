const express = require("express")
const logger = require("morgan")
const mongoose = require("mongoose")
const Handlebars = require('handlebars');
const exphbs = require("express-handlebars");
const moment = require("moment")
console.log(moment())

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
const app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

require("./routes/apiRoutes")(app)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1
})


app.listen(PORT, () => console.log("App running on port " + PORT + "!"))