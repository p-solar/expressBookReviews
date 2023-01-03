const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username,password} = req.body;
  // const username = req.params.username;
  // const password = req.params.password;
  if (!username || !password) {
    return res.status(401).send('the username or password not provided');
  }
  const user = users.filter((user)=>user.username===username);
  console.log(user)
  if (user.length>0) {
    return res.status(401).send('the username already exists');
  }
  users.push({username : username, password: password})
  console.log(users);
  return res.status(200).send('user successfully registered')
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  res.send(JSON.stringify(books,null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  

  res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author
  let keys = Object.keys(books);
  console.log(keys)
  keys.forEach((key)=>{
    if(books[key].author === author) {
      res.send(books[key])
    }
  })
  res.send('book not found')
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  let keys = Object.keys(books);
  console.log(keys)
  keys.forEach((key)=>{
    if(books[key].title === title) {
      res.send(books[key])
    }
  })
  res.send('book not found')
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
