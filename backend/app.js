var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")

const connection = require("./conn");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 
// ITEMS
//

app.get("/items", (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

        connection.query("SELECT * FROM items WHERE done = 0" , (err, data) => {
            if (err) {
                console.log("err", err);
            }

            console.log("data från query", data);
            res.json(data)
        })
    })
})

app.get("/items/:id", (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

        connection.query("SELECT * FROM items WHERE done = 0 AND itemId = " + req.params.id , (err, data) => {
            if (err) {
                console.log("err", err);
            }

            data.map(text => {
                text.itemDescription = Buffer.from(text.itemDescription).toString();
            })

            console.log("en item", data);
            res.json(data)
        })
    })
})

app.get("/items/:listId", (req, res) => {

    let listId = req.params.listId;

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

        connection.query("SELECT * FROM items WHERE done = 0 AND listId = " + listId , (err, data) => {
            if (err) {
                console.log("err", err);
            }

            console.log("data från query", data);
            res.json(data)
        })
    })
})

app.post("/items", (req, res) => {
    let newTodo = req.body;
    let saveText = "Lorem ipsum, Dollars!"

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

        let sql = "INSERT INTO items (itemName, listId, itemDescription) VALUES ('"+newTodo.newTodoName+"', "+newTodo.newTodoList+", '"+saveText+"' )";

        connection.query(sql, (err, data) => {
            if (err) {
                console.log("err", err);
            }

            console.log("sparad", data);
            res.json(data)
        })
    })
})

app.post("/done", (req, res) => {
    let itemDone = req.body.itemId;

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

       let sql = "UPDATE items SET done = 1 WHERE itemId = " + itemDone;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log("err", err);
            }

            console.log("sparad", data);
            res.json(data)
        })
    })
})

//
// LISTOR
//

app.get("/lists", (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log("err", err);
        }

        connection.query("SELECT * FROM lists" , (err, data) => {
            if (err) {
                console.log("err", err);
            }

            console.log("Listor", data);
            res.json(data)
        })
    })
})

module.exports = app;
