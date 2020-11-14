const express=require('express');
const app=express();
const mongoose=require('mongoose');

//Import routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');

//connect to db
mongoose.connect('mongodb://localhost/logindb', 
{useNewUrlParser: true, useUnifiedTopology: true},()=>console.log('connected to db!'));

//Middleware
//app.use(express.bodyParser());
app.use(express.json());





//Routes Middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);



app.listen(3000,()=>{
    console.log('Server started on http://localhost/3000')
})