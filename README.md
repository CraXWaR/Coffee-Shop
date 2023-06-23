# Coffee-Shop
Coffee-Shop app made for educational purpose, created with Angular as front-End, Node.js as Back-End and MongoDB as database.

## General information
* The main purpose of the app is to view/add cafes for sale.
* Guests are only able to see Home Page and All Cafes.
* Logged in users have access to Add Cofee and Profile information, as well they have the ability to Edit/Delete their own posts.

## Technologies 
* Client
    * Angular CLI: 15.0.2
* Server
    * Node: 18.12.0
    * ExpressJS: 4.18.2
    * bcrypt: 5.1.0
    * cors: 2.8.5
    * dotenv: 16.0.3
    * jsonwebtoken: 9.0.0,
    * mongoose: 6.7.3,
    * nodemon: 2.0.20
## Setup
To run this project, in the project directory, you should run:

```
$ cd ./client
$ npm install
$ ng serve
```
Which opens the app at http://localhost:4200 in your browser.
However it will not work properly until you don't start the RESTful API server.
To start the server you have to be in the project directory and do the following steps:

```
$ cd ./server
$ npm install
$ npm start
```

And the server will start listening on port 3030.