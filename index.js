const express = require('express');
const app = express();
const userRoute = require('./src/routes/userRoutes');
const authRoute = require('./src/routes/authRoute');
const newsRoute = require('./src/routes/newsRoute');
const connectDatabase = require('./src/database/db');

require('dotenv').config();

connectDatabase();
const port = 3000;

app.use(express.json());
app.use('/news', newsRoute);
app.use('/user', userRoute);
app.use('/auth', authRoute);



app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));