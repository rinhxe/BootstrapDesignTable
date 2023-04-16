var fs = require('fs');
var myModel = require('../models/products.model');
const multer = require('multer');

const upload = multer();


exports.getList = async(req,res,next)=>{
    
    let listCat = await myModel.catalogueModel.find();
    let list = await myModel.productModel.find().populate('id_catalogue');

  
     
    res.render('product/list',{objProductList:list,listCat:listCat});
   
    //ejs.co

};



exports.addProduct= async(req,res,next)=>{
    
    let msg = '';
    let listCat = await myModel.catalogueModel.find();

    if(req.method == 'POST'){
        let objProduct = new myModel.productModel();
        objProduct.name = req.body.name;
        objProduct.price = req.body.price;
        // try {
        //     fs.renameSync(req.file.path,
        //         '/public/uploads/' + req.file.originalname);
          
                

        //     objProduct.file_image = '/uploads/'+req.file.originalname;
        // } catch (error) {
        //     console.log('Error: '+error);
        // }
        
        objProduct.description = req.body.description;
        objProduct.id_catalogue = req.body.id_catalogue;
        //write to database:
        try { 
            let newObjProduct = await objProduct.save();
            console.log(newObjProduct);
            msg='Add done'; 
            res.redirect('/product');
        } catch (error) {
            msg='Error: '+error.message;
            console.log(msg);   
        }

    }


   
    
    res.render('product/add',{msg:msg,listCat:listCat})
}

exports.editProduct =  async(req,res,next) =>{

    let msg = '';
    let listCat = await myModel.catalogueModel.find();
    let idProduct = req.params.idProduct;
    let objProduct = await myModel.productModel.findById(idProduct);

    if(req.method=='POST'){
    
       
        //write to database: 
        try { 
            await myModel.productModel.findByIdAndUpdate(idProduct,{
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                id_catalogue: req.body.id_catalogue
              });
            console.log("Updated!");
            msg='Updated!'; 
        } catch (error) {
            msg='Error: '+error.message;
            console.log(msg);
        }
        res.redirect('/product');

    }
    console.log(objProduct);
    

    res.render('product/edit',{objProduct:objProduct,listCat:listCat})

}

exports.deleteProduct =  async(req,res,next) =>{

    let idProduct = req.params.idProduct;
    await myModel.productModel.findByIdAndDelete(idProduct);
    res.redirect('back');
}

exports.detailProduct = async(req,res,next)=>{
    let idProduct = req.params.idProduct;
    let listCat = await myModel.catalogueModel.find();

    let objProduct = await myModel.productModel.findById(idProduct);
    if(req.method=='POST'){

        res.redirect('/product');
    }
    res.render('product/detail',{objProduct:objProduct,listCat:listCat})
}