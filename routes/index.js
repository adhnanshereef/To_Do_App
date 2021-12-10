var express = require('express');
var router = express.Router();
const helper=require('../config/helper')
const password="todoapp"
let meDetails={
  id:"19qp28wo37ei0",
  name:"Adhnan Shereef T"
}

// Login Verification
const verifyLogin = (req, res, next) => {
  if (req.session.me) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Home
router.get('/', (req, res, next)=> {
  res.render('pages/index', { title: 'To Do App',me:req.session.me });
});

// Login

router.get('/login',(req,res)=>{
  if(req.session.me){
    res.redirect('/')
  }else{
    res.render('pages/login',{title:'To Do App | Login'})
  }
})

router.post('/login',(req,res)=>{
  console.log('helooo err');
  console.log('keyy'+req.body.password);
  if(req.body.password==password){
    req.session.me=meDetails
    res.json({loginSuccess:true})
  }else{
    res.json({loginSuccess:false})
  }
})

router.get('/logout',verifyLogin,(req,res)=>{
  req.session.me=null
  res.redirect('/')
})

module.exports = router;
