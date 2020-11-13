const express=require('express');
const app=express();
const mongoose=require('mongoose');

//Import routes
const authRoute=require('./routes/auth');

//connect to db
mongoose.connect('mongodb://localhost/logindb', 
{useNewUrlParser: true, useUnifiedTopology: true},()=>console.log('connected to db!'));

//Middleware
//app.use(express.bodyParser());
app.use(express.json());





//Routes Middlewares
app.post('/pin', function(request, response){
    console.log(request.body);      // your JSON
     response.send(request.body);    // echo the result back
  });

app.use('/api/user',authRoute);



app.listen(3000,()=>{
    console.log('Server started on http://localhost/3000')
})