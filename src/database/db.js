const mongoose = require('mongoose');

const connectDatabase = () =>{
    console.log("Wait connecting to the database");

    mongoose.connect( process.env.CONECT_DB, 
    { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => console.log("MongoDB Altlas Connected")).catch((error) => console.log
    (error));
};

module.exports = connectDatabase;