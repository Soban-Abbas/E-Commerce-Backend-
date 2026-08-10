const express=require("express");
const router=express.Router();
const bodyParser=require("body-parser");
const { verifyToken } = require("../middleware/verifyJwtToken");
const { isCustomer } = require("../middleware/isCustomer");
const wishlistController=require("../controllers/wishlistController")
const jsonParser=bodyParser.json()
const userController=require("../controllers/userController")


router.get('/products',userController.getProducts);
router.post('/wishlist',verifyToken,isCustomer,wishlistController.addIntoWishlist)

module.exports=router;