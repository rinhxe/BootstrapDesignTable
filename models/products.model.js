var db = require ('./db');

const productSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        file_image:{type:String,required:false},
        description:{type:String,required:false},
        id_catalogue:{type: db.mongoose.Schema.Types.ObjectId,ref:'catalogueModel'}
    },
    {
        collection:'products'
    }
);
let productModel = db.mongoose.model('productModel',productSchema);

const catalogueSchema = new db.mongoose.Schema(
    {
        name:{type:String,required:true}
    },
    {
        collection:'catalogue'
    }
);
let catalogueModel = db.mongoose.model('catalogueModel',catalogueSchema);

module.exports = {productModel,catalogueModel}

