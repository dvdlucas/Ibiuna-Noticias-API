const express = require('express');
const app = express();
const userRoute = require('./src/routes/userRoutes');
const authRoute = require('./src/routes/authRoute');
const connectDatabase = require('./src/database/db');

connectDatabase();
const port = 3000;

app.use(express.json());
app.use('/user', userRoute);
app.use('/auth', authRoute);




//usuario mongodb  ti - senha docknox@2023


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));