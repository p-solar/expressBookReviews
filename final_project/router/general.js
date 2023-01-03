const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios')
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
public_users.get('/', async function (req, res) {
    const bookdb = await books;
   res.send(JSON.stringify(books,null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  const isbn = req.params.isbn;
  const book = await books[isbn];

  res.send(book)
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author
  let book = {};
  let keys = Object.keys(books);
  book = await getbookByAuthor(author,keys);
  
  res.send(book)
});

 function getbookByAuthor(author,keys) {
  console.log(author + keys)
  const key = keys.filter((key)=> books[key].author===author)
  console.log(books[key])
  return books[key];
  
}

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  let book = {};
  const title = req.params.title
  let keys = Object.keys(books);
  book = await getbookByTitle(title,keys);
  res.send(book)
});

function getbookByTitle(title,keys) {
  console.log(title + keys)
  const key = keys.filter((key)=> books[key].title===title)
  console.log(books[key])
  return books[key];
  
}

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn
  res.send(books[isbn].reviews)
});

module.exports.general = public_users;
