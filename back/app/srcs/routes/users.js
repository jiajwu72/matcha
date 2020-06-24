var express = require('express');
var router = express.Router();
const controller = require('../controller/User');
//const authController = require('../controller/Auth');
const authMw=require("../middleware/auth");
/*
const visitorMw=require("../middleware/visitor");
const dynamicMiddleware = require('express-dynamic-middleware');


const dynamicAuth=dynamicMiddleware.create(authMw);
const dynamicVisitor=dynamicMiddleware.create(visitorMw);
*/


router.get('/', controller.findAll)					//list users
		.post('/',controller.register)				//register a user

router.post('/login',controller.login);				//log a user
router.get('/:username',controller.findOne)			//search a user return info
	.put('/:username',controller.update);			//update a user
router.put('/:username/resetPassword',controller.updatePassword); //update user password


module.exports = router;