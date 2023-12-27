const express=require('express');
const user_route=express();


const  bodyParser=require('body-parser');

 const session=require('express-session');
 const{SESSION_SECRET}=process.env;
 user_route.use(session({ 
    secret:'SESSION_SECRET',
    resave: true,
    saveUninitialized: true
 }));

 user_route.use(bodyParser.json());
 user_route.use(bodyParser.urlencoded({extended:true}));

 user_route.set('view engine','ejs');
 user_route.set('views','./views');

 user_route.use(express.static('public'));


 const path=require('path');
 const multer=require('multer');

 const storage=multer.diskStorage(
    {
        destination:function(req,file,cb){
            cb(null,path.join(__dirname,'../public/images'));

        },
        filename:function(req,file,cb){
            const name= Date.now()+'-'+file.originalname;
            cb(null,name);
        }
    });
 const upload= multer({storage:storage});
const userControllers=require('../controllers/userControllers')

const auth=require('../middlewares/auth')

 user_route.get('/register',auth.isLogout,userControllers.registerLoad);
 user_route.post('/register',upload.single('image'),userControllers.register);

 
 user_route.get('/',auth.isLogout,userControllers.loadLogin);
 user_route.post('/',userControllers.login); 
 user_route.get('/logout',auth.isLogin,userControllers.logout);

 user_route.get('/dashboard',auth.isLogin,userControllers.loadDashboard);

 user_route.post('/save-chat',userControllers.saveChat);

 user_route.post('/delete-chat',userControllers.deleteChat);


 user_route.get('*',function(req,res){
    res.redirect('/');
 }); 


 module.exports=user_route;
