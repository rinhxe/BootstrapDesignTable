const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/assigment_database')
        .catch( (err)=>{
                console.log('Database connection error');
                console.log(err);
        });
module.exports = { mongoose }