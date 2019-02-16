var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var customers = [
    {
      name: "bob foodie",
      party: 1,
      phoneNumber: 4445556666
    },
    {
      name: "tim foodie",
      party: 4,
      phoneNumber: 444345344
    },
    {
        name: "sarah foodie",
        party: 2,
        phoneNumber: 444545343345
    },
    {
        name: "cindy foodie",
        party: 6,
        phoneNumber: 444545343345
    },
];

waitList = [
    {
        name: "chuck foodie",
        party: 1,
        phoneNumber: 4445553453
    }
]

//routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "restaurantHome.html"));
});

app.get("/view", function(req, res) {
    res.sendFile(path.join(__dirname, "restaurantViewT.html"));
  });

app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "restaurantReservation.html"));
});


//display customers
app.get("/api/customers", function(req, res) {
    return res.json(customers);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitList);
});


app.post("/api/customers", function(req, res) {
    
    var newcustomer = req.body;

    newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newcustomer);

    if(customers.length >= 5){
        waitList.push(newcustomer);
        return res.json(false);
    } else {
        customers.push(newcustomer);
        return res.json(true);
    }
  });

  app.post("/api/action", function(req, res) {
    var action = req.body;
    console.log(action.action);
    if(action.action === "clear"){
        customers = [];
        waitList = [];
        return res.json(true);
    }
  });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
  