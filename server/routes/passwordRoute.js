const { sendPasswordLinkController, getResetPasswordController, getResetPasswordLinkController } = require("../controllers/passwordController");

const router=require("express").Router();

//api/password/reset-password

router.post('/password-reset-link',sendPasswordLinkController)

//api/password/reset-password

router.route('/reset-password/:userId/:token').get(getResetPasswordLinkController).post(getResetPasswordController)
module.exports=router