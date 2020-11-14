const router=require('express').Router();
const User=require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {registerValidation,loginValidation}=require('../validation');

//validation





router.post('/register',async (req,res)=>
{
   //lets validate
    const{error}=registerValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //chacking if the user already exist
    const emailExist=await User.findOne({email: req.body.email});

    if(emailExist)
    return res.status(400).send("Email already exist");

    //Hash Password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);


    const user=new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const saveduser=await user.save();
        res.send(saveduser);

    }catch(err){
                res.status(400).send(err);
    }
    
    
   
});

router.post('/login',async (req,res)=>{
  //lets validate the data if user
    const{error}=loginValidation(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //checking if email doesnt exist
    const user=await User.findOne({email: req.body.email});

    if(!user)
    return res.status(400).send("Email dosent exist");

    //check if password is correct
    const validpass=await bcrypt.compare(req.body.password,user.password);
    if(!validpass)
    return res.status(400).send("Invalid password");

    //create and assign token
   // console.log(process.env.TOKEN_SECRET);
    const token=jwt.sign({_id: user._id},"kjkjhasds");
    res.header('auth-token',token).send(token);

   // res.send('Logged in');

   
})


module.exports=router;

// router.post('/login',(req,res)=>
// {
//     res.send('Register');
// })


