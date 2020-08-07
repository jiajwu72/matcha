var express=require('express');
var router=express.Router();
const controller=require('../controller/Tag');

router.get("/:tagId",controller.listTag);
// router.post("/add",controller.addNewTag);
// router.post("/matchUser",controller.matchUser);
// router.post("/dismatchUser",controller.dismatchUser);

module.exports = router;
