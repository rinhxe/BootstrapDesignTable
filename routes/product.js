var express = require("express");
var router =express.Router();
var productController = require('../controllers/product.controller')
var check_login = require('../middleware/check_login');


var multer = require('multer');

router.get('/',productController.getList);

router.get('/add',productController.addProduct);
router.post('/add',productController.addProduct);

router.get('/edit/:idProduct',productController.editProduct);
router.post('/edit/:idProduct',productController.editProduct);


router.get('/delete/:idProduct',productController.deleteProduct);
router.delete('/delete/:idProduct',productController.deleteProduct);

router.get('/detail/:idProduct',productController.detailProduct);
router.post('/detail/:idProduct',productController.detailProduct);

module.exports = router;