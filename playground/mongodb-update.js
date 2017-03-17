const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {

    if(err){

        return console.log('Unable to connect mongodb');

    }

    console.log('Connected to mongodb server');

    db.collection('Users').findOneAndUpdate({

        age : 24

    },
    {   
        $set : {

            name : 'Birtan JR'

        },

        $inc : {

            age : -1

        }

    },{

        returnOriginal : false

    }).then((result)=> {

        console.log(result);

    });

});