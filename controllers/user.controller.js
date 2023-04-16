var fs = require('fs');
var myModel = require('../models/users.model');


exports.getList = async(req,res,next)=>{
    //need view

    
    let list = await myModel.userModel.find();

  

    res.render('users/list',{objUserList:list});
    //ejs.co
};

exports.addUser= async(req,res,next)=>{
    
    if(req.method == 'POST'){
        let objUser = new myModel.userModel();
        objUser.username = req.body.username;
        objUser.passwd = req.body.passwd;
        objUser.email = req.body.email;
        objUser.role = req.body.role;
        console.log(objUser);
        console.log(req.body.role);

        try {
            let newObjUser = await objUser.save();
            
           res.redirect('/users');
        } catch (error) {
            console.log(error);
        }

    }
    
    res.render('users/add')
}   

exports.deleteUser =  async(req,res,next) =>{

    let idUser = req.params.idUser;
    await myModel.userModel.findByIdAndDelete(idUser);
    res.redirect('back');
}

exports.login = (req,res,next) =>{
    res.render('users/login')
}
exports.login = async (req, res, next)=>{
    let msg = '';
    if(req.method == 'POST'){
        try {
            let objU = await myModel.userModel.findOne({username: req.body.username});
            console.log(objU);
            if(objU != null ){
                // tồn tại username ==> kiểm tra passwd
                if(objU.passwd == req.body.passwd){
                    // đúng thông tin tài khoản ==> lưu vào session
                    req.session.userLogin = objU; 
                    // chuyển trang về trang quản trị
                    return res.redirect('/users');
                }else{
                    msg = 'Sai password';
                    console.log(msg);
                }

            }else{
                msg = 'Không tồn tại tài khoản: ' + req.body.username;
                console.log(msg);
            }

        } catch (error) {
            msg = error.message;
            console.log(msg);
        }
    } 

    res.render('users/login', {msg:msg})
}

exports.reg = async (req, res, next)=>{
    let msg = '';
    if(req.method == 'POST'){
        try {
            let objU = await myModel.userModel.findOne({username: req.body.username});
            
            if(objU != null ){
                msg='Đã tồn tại tài khoản: '+ req.body.username;
                return res.render('users/reg', {msg:msg});
            }else{
                
                let objUser = new myModel.userModel();
                objUser.username = req.body.username;
                objUser.passwd = req.body.passwd;
                objUser.email = req.body.email;
                objUser.role = "user";
                console.log(objUser);
                console.log(req.body.role);
        
                try {
                    let newObjUser = await objUser.save();
                    msg='Đăng kí thành công tài khoản : '+ req.body.username;
                 
                } catch (error) {
                    console.log(error);
                }

            }

        } catch (error) {
            msg = error.message;
            console.log(msg);
        }
    } 

    res.render('users/reg', {msg:msg})
}
exports.logout = (req, res, next)=>{
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
}