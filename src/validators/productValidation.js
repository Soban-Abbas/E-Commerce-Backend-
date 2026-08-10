const {check}=require("express-validator")

exports.productsValidation=[
    check('name')
    .trim()
    .notEmpty()
    .withMessage("name cannot be empty")
    ,
    check("category")
        .trim()
        .notEmpty()
        .withMessage("category cannot be empty"),
      check('description')
           .trim()
          .notEmpty()
          .withMessage("description cannot be empty") , 
          check('price')
          .isFloat({min:0.01,max:99999999.99})
          .withMessage("price must in range 0.01 to 99999999.99")
          ,
          check("quantity")
          .isInt({min:1,max:100})
          .withMessage("quantity should be in between 1 to 100")
          ,
          check("is_active")
          .isIn([true,false])
          .withMessage("is_active can only be true or false")
          ,
          check("imageUrl")
          .isURL()
          .withMessage("please enter valid url")
        
]
