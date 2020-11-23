const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
//Controllers
const register = require('./controllers/Register');
const signIn = require('./controllers/SignIn');
const entries = require('./controllers/Entries');
//Connection to Database----------------------------------------
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});
//Midleware------------------------------------------------------
app.use(express.json());
app.use(cors())

//HTTP Request---------------------------------------------------
app.get('/', (req,res)=>{
	res.json('hello');
})
//==Sign In===
app.post('/signin', signIn.handleSignIn(knex,bcrypt) )
//==Register===
app.post('/register', (req,res)=>{ register.handleRegister(req,res,knex,bcrypt) })
//==Update Entries===
app.put('/entries', (req,res)=>{ entries.handleEntries(req,res,knex) })
//==getting box from Clarifai
app.post('/clarifai', (req,res)=>{ entries.handleApiCall(req,res)})

const PORT = process.env.PORT || 3002
app.listen(PORT,()=>{
	console.log(`app is running on port ${PORT}`)
});