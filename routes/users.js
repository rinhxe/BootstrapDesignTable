var express = require("express");
var router =express.Router();
var userController = require('../controllers/user.controller')
var check_login = require('../middleware/check_login');


router.get('/',check_login.request_login,userController.getList);

router.get('/add',userController.addUser);
router.post('/add',userController.addUser);

router.get('/delete/:idUser',userController.deleteUser);
router.delete('/delete/:idUser',userController.deleteUser);

router.get('/login',check_login.not_request_login,userController.login);
router.post('/login',check_login.not_request_login,userController.login);


router.get('/reg',check_login.not_request_login,userController.reg);
router.post('/reg',check_login.not_request_login,userController.reg);

router.get('/logout',check_login.request_login,userController.logout);

module.exports = router;