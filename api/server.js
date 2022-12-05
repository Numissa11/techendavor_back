// file avec tout ce qu'il y a pour le serveur

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./dbConfig');

const server = express()

// cors and helmet are middelware (stuff that check if everything went ok between 2 process and if yes, goes to the next function)
// both are something that make secure the sendings of things on the net
server.use(cors())
server.use(helmet())
// express.json :  parse request into json format, cause if you don't do that,
// you are going to run into problems, because if your request in your body, in json format
// then, you have to explicitely say to your server, here, parse this to json
server.use(express.json())

const testData = require('./testData');

// we put all of this before our endpoint api.get request('/', (req,res) => {....}

// this is called an endpoint:
server.get('/', (req,res) => {
    res.send('Welcome to this awesome todo server!!!')
})

server.get('/todos', async (req,res) => {
    // GET todo by id
    try {
        const todos = await db('todos');
        res.json(todos)
    } catch(err) {
        console.log(err)
    }
})

server.post('/todos', async (req, res) => {
    // POST a todo (creat a new one)
    const todo = req.body
    if(!todo) {
        // if there is no todo, we want to return and send a mesage of what gone wrong
        // if no todo, reponse with status message 400
        return res.status(400).json({message:'You must include a todo in your request'})
    }
    try {
        // knex give us the .insert methode, that will insert this into the database for us
        await db('todos').insert(todo)
        res.json({message: 'Todo successfully stored'})
        
    } catch (err) {
        console.log('err', err);
    }
})

server.put('/todos:id', (req, res) => {
    // PUT a todo is (update)
    // pour update, faut un id pour savoir qui ont update, 
    // et dans ce cas, les :id (:id) ca va représenter une variable, le id
})

server.delete('/todos:id', (req, res) => {
    // DELETE a todo (effacer)
})

// if those .use (cors,helmet,express.json) would be after the endpoint api.get('/'){...} 
// my endpoint wouldn't have access to them

module.exports = server;