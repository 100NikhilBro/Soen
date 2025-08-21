const express = require('express');
const { createUserController, userLoginController, profileController, logOut } = require('../controllers/user.controller.js');
const router = express.Router();

const expressValidator = require('express-validator');
const authUser = require('../middlewares/auth.middleware.js');


router.post("/register", [expressValidator.body('email').isEmail().withMessage("Email must be a valid email address"),
        expressValidator.body('password').isLength({ min: 3 }).withMessage("Password with at least  of lenght 3"),
    ],
    createUserController);


router.post("/login", [expressValidator.body('email').isEmail().withMessage("Email must be a valid email address"),
        expressValidator.body('password').isLength({ min: 3 }).withMessage("Password with at least  of lenght 3")
    ],
    userLoginController
)



router.get("/profile", authUser, profileController)
router.get("/logOut", authUser, logOut);


router.get("/alluser", authUser, )




module.exports = router;