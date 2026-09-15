import express = require('express');
require('dotenv').config();
const User = require('./models/user');
const cors= require('cors');
const app=express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes=require('./routes/user');
const linkRoutes=require('./routes/link');
const clickRoutes=require('./routes/click');
app.use(bodyParser.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://linkzip-kappa.vercel.app",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(cookieParser());
const port=3000;
const db=require('./config/db');
app.use('/api/user',userRoutes);
app.use('/api/link',linkRoutes);
app.use("/c",clickRoutes);

db().then(()=>{
    console.log('Database connected successfully');
}).catch((err:any)=>{
    console.log(err);
})
app.get('/', async (req:any,res:any)=>{
    console.log("/get");
    const users= {message:"welcome to link zip"}

    return res.json(users);
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
