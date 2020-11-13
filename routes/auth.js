const router=require('express').Router();
const User=require('../model/User');


router.post('/register',async (req,res)=>
{
//     console.log(req.body);
//    console.log(req.body.name);
//    console.log(req.body.email);
//    console.log(req.body.password);

    const user=User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then((temp)=>{
        res.json(temp);
    }).catch((err)=>{
        res.send(err);
    })
    
   
});


module.exports=router;

// router.post('/login',(req,res)=>
// {
//     res.send('Register');
// })


