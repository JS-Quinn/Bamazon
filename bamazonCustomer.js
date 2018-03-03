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
                type: "input",
                message: "What is the ID of the item would you would like to buy?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units would you like to buy?"
            }
        ])
        .then(function(answer) {
            connection.query("select * from products", function(err, results) {
                if (err) throw err;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.itemID) {
                        if (results[i].stock_quantity >= answer.quantity) {
                            var query = connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                  {
                                    stock_quantity: results[i].stock_quantity - answer.quantity
                                  },
                                  {
                                    item_id: answer.itemID
                                  }
                                ]
                            )
                            console.log("You purchased " + answer.quantity + " units.");
                            console.log("Total Price: $" + (answer.quantity * results[i].price));
                            console.log("Connection terminated. Have fun with that " + results[i].product_name + "...");
                            connection.end();
                        }
                        else {
                            console.log("Insufficient quantity!");
                            console.log("Connection terminated");
                            connection.end();
                        }
                    }
                }
            });
        });
    });
}
