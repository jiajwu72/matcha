
var express=require('express');
var router=express.Router();
const controller=require('../controller/User');

router.get('/:id/get',controller.getInfo) //get user information
router.post('/add',controller.addUser)  //add users
router.post('/:id/update',controller.updateInfo)  //update users
router.post('/:id/defineProfil',controller.defineProfil)  //update users
router.post('/auth',controller.auth)  //connect users
router.post('/logout',controller.logout)  //logout users
router.post('/forgot',controller.forgot)  //forgot password/verrif user email
router.get('/reset/:token',controller.resetCheck)  //verrif forgot token
router.post('/reset/:token',controller.reset)  //list users

module.exports = router;
