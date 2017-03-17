const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) =>{

    if (err) {

        return console.log('Unable to connect mongodb server');

    }

    console.log('Connected to mongodb server');

    //deleteMany
    
    /*db.collection('Todos').deleteMany({text : 'Eat lunch'}).then((result) => {

        console.log(result);

    });*/

    //deleteOne

    db.collection('Todos').deleteOne({text : 'Eat lunch'}).then((result) => {

        console.log(result);

    });



});

