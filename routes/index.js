var express = require('express');
var router = express.Router();
const helper=require('../config/helper')
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
router.get('/', async(req, res)=> {
  let program=await helper.getProgram()
  res.render('pages/index', { title: 'To Do App',me:req.session.me,program });
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
  helper.doLogin(req.body.password).then((resonse)=>{
    if(resonse){
      req.session.me=meDetails
      res.json({loginSuccess:true})
    }else{
        res.json({loginSuccess:false})
      }
    })
})

router.get('/logout',verifyLogin,(req,res)=>{
  req.session.me=null
  res.redirect('/')
})
router.post('/logout',(req,res)=>{
  if(req.session.me){
    req.session.me=null
    res.json({success:true})
  }else{
    res.json({success:false})
  }
})

// To Do
router.get('/to-do',verifyLogin,async(req,res)=>{
  let program=await helper.getProgram()
  res.render('pages/to-do',{title:"To Do App | To Do",me:req.session.me,program})
})

// New
router.get('/new',verifyLogin,(req,res)=>{
  res.render('pages/new',{me:req.session.me,title:"To Do App | New"})
})

router.post('/new',verifyLogin,(req,res)=>{
  console.log(req.body);
  helper.addProgram(req.body).then((status)=>{
    console.log(status);
    res.json(status)
  })
})

// Done program 
router.get('/done-program/:text/:id',verifyLogin,(req,res)=>{
  helper.doneProgram(req.params.text,req.params.id).then(()=>{
    res.json({success:true})
  })
})

// Done

router.get('/done',verifyLogin,async(req,res)=>{
  let done=await helper.getDone()
    res.render('pages/done',{title:"To Do App | Done",me:req.session.me,done})
})

// Delete All Done
router.get('/delete-all-done',verifyLogin,(req,res)=>{
  helper.deleteAllDone().then(()=>{
    res.json({success:true})
  })
})

// Delete Done
router.get('/delete-doned/:id',verifyLogin,(req,res)=>{
  helper.deleteDoned(req.params.id).then(()=>{
    res.json({success:true})
  })
})

// Drop program 
router.get('/drop-program/:text/:id',verifyLogin,(req,res)=>{
  helper.dropProgram(req.params.text,req.params.id).then(()=>{
    res.json({success:true})
  })
})


// Drop

router.get('/drop',verifyLogin,async(req,res)=>{
  let drop=await helper.getDrop()
    res.render('pages/drop',{title:"To Do App | Drop",me:req.session.me,drop})
})

// Delete All Drop
router.get('/delete-all-drop',verifyLogin,(req,res)=>{
  helper.deleteAllDrop().then(()=>{
    res.json({success:true})
  })
})

// Delete Drop
router.get('/delete-droped/:id',verifyLogin,(req,res)=>{
  helper.deleteDroped(req.params.id).then(()=>{
    res.json({success:true})
  })
})

module.exports = router;
