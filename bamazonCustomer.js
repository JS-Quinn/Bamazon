var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("ID#: " + results[i].item_id + ", Item: " + results[i].product_name + ", Price: " + results[i].price);    
        }
        start();
    });
    
});

function start() {
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "rawlist",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                      choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "What item would you would like to buy?",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?",
            }
        ])
        .then(function(answer) {
            connection.query("select * from products", function(err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.itemID) {
                        if (results[i].stock_quantity >= answer.quantity) {
                            results[i].stock_quantity - answer.quantity;
                        }
                        else {
                            console.log("Not enough stock!");
                        }
                    }
                }
            
            });
        // based on their answer, either call the bid or the post functions
        if (answer.productID === "POST") {
            
        }
        else {
            
        }
        });
    });
}