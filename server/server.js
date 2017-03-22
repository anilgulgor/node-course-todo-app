var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const lod = require('lodash');
var {Mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todos');
var {User} = require('./models/User');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text : req.body.text,
        completed : req.body.completed
    });

    todo.save().then((doc) => {

        res.send(doc);

    }, (err) => {

        res.send(err);

    });

    /*var updated = Todo.where({_id : '58cfd9f4bbf70315b85e0e48'});
    updated.update({text : req.body.text}).exec().then((doc) => {

        res.send(doc);

    }, (err) => {

        res.send(err);

    });*/

});

/*app.post('/users', (req, res) => {

    var user = new User({
        email : req.body.email
    })

    user.save().then((doc) => {

        res.send(doc);

    }, (err) => {

        res.send(doc);

    });

});*/

app.post('/users', (req, res) => {

    var body = lod.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((user) => {

        res.send({user});

    }).catch((err) => {

        res.status(400).send(err);

    });

});

app.get('/todos', (req, res) => {

    Todo.find().then((todos) => {

        res.send(todos);

    }, (err) => {

        res.status(400).send(err);

    });

});

app.get('/', (req, res) => {

    res.type('text/html');
    res.send('<b> hello world </b>');

});

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){

        return res.status(404).send();

    }

    Todo.findById(id).then((todo) => {

        if(!todo){

            return res.status(404).send();

        }

        todo.remove().then((todo) => {

            console.log(`deleted ${todo}`);

            res.send({todo});

        }, (err) => {

            console.log('can not delete', err);

            res.status(404).send();

        });

    })


});

app.get('/todos/:id', (req,res) => {

    var id = req.params.id;

    if(!ObjectID.isValid(id)){

        return res.status(404).send();

    }

    Todo.findById(id).then((todo) => {

        if(!todo){

           return res.status(404).send();

        }

        res.send(todo);

    }).catch((err) => {

        res.status(404).send();

    });

});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

