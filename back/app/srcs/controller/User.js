const UserModel = require('../model/User');
const bcrypt=require("bcrypt");
var salt = bcrypt.genSaltSync(10);


class UserController {

  
  update(req, res) {
      
      const username=req.params.username;
      const updateInfo=req.body;

      /*
      if(updateInfo.password)
      {
        updateInfo.password = bcrypt.hashSync(updateInfo.password, salt);
      }
      */
      UserModel.update({"username":username},{$set:updateInfo},function(err,doc){
        if (err || !updateInfo.username)
          res.status(401).json({"msg":"update user error"});
        else
          res.status(200).json({"msg":"update success!"});
      });
  }

/**
*   {oldPassword:"",newPassword:""}
*/

  updatePassword(req, res) {
    const info = req.body;
    const username=req.params.username;
    //console.log(username);
    UserModel.findOne({"username":username}).then((user)=>{
      if (user){
        const valid=user.validatePassword(info.oldPassword);
        //console.log(valid)
        if (valid)
        {
          const newPassword = bcrypt.hashSync(info.newPassword, salt);
          //console.log(newPassword);
          user.password=newPassword;
          user.save();
          res.status(200).json({"msg":"password is changed"});
        }
        else
          res.status(401).json({"msg":"password is incorrect"});
      }
      else{
        res.status(401).json({"msg":"user not found"});
      }
    })
  }

  findAll(req, res) {
    UserModel.find({}, function(err,docs){
      //res.send(docs);
      res.status(200).json(docs);
    });
  }

  findOne(req,res){
    const search=req.params.username;
    console.log("request:"+search)
    UserModel.findOne({"username":search}, function(err,docs){
      console.log()
      res.send(docs);
    });
  }

  register(req, res) {
    const user=req.body;
    var salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    UserModel.create(user, function (err, doc) {
      if (err) {
        res.status(401).json({"msg":"create user error"});
      } else {
        res.status(200).json({"msg":"add success!"});
      }
    });
  }

  login(req,res){
    const info=req.body;
    UserModel.findOne({"username":info.username})
    .then((user)=>{
      //console.log(user)
      if (user)
      {
        const success=user.validatePassword(info.password)
        console.log("msg1:",success)
        if(success)
          res.status(200).json({"token":user.generateJWT()});
        else
          res.status(401).json({"msg":"password incorrect"});
      
      }else{
        res.status(401).json({"msg":"login error"});
      }
    })
    
  }

}


module.exports = new UserController();
