var db=require('./index.js')
const bcrypt=require("bcrypt");
var salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');


const searchBy=function(user){
  return new Promise((resolve,reject)=>{
    console.log(user);
    const request=`SELECT * FROM user WHERE ?`;
    db.query(request,user,(err,result)=>{
      if (err){
        console.log(err)
        resolve(null);
      }
      else resolve(result[0]);
    })
  })
}

const addUser=function(user){
  return new Promise((resolve,reject)=>{
    const request=`SELECT * FROM user WHERE ?`;
    const values={email:user.email};
    db.query(request,values,(err,results)=>{
      if (results[0])
      {
        reject("Cet email est déjas utilisé, veuillez en choisir une autre!");
      }
      else {
        console.log("crypt psw");
        bcrypt.hash(user.password, salt, function(err, hash) {
            const request="INSERT INTO user SET ?";
            const values={first_name:user.last_name,email:user.email,password:hash,sex:user.sex}
              db.query(request,values,(err,results)=>{
                if (err) reject(err);
                else resolve(results);
              })
        });
      }

    })

  })
}

const updateInfo=function(user){
  return new Promise((resolve,reject)=>{
    const request= `UPDATE user SET ? WHERE id=${user.id}`
    const values={first_name:user.first_name,last_name:user.lastname,locality:user.locality,
                  code_postal:user.code_postal,latitude:user.latitude,longitude:user.longitude,
                  pop_score:user.pop_score,img1:user.img1,img2:user.img2,img3:user.img3,img4:user.img4,
                  img5:user.img5,selectImg:user.selectImg,orientation:user.orientation,biographe:user.biographe,
                  updated_at:new Date()};
    db.query(request, values,(err,result) => {
          if (err) reject(err);
          //callback(result);
          else resolve(result)
    });
  })
}

const save=function(user){
  console.log("start save,request:",user);
  return new Promise((resolve,reject)=>{
    user.created_at="NOW()";
    user.updated_at="NOW()";
    const request= `UPDATE user SET ? WHERE id=${user.id}`
    const values=user;
    // console.log(user)
    db.query(request, values,(err,result) => {
          // if (err) reject(err);
          // //callback(result);
          // else resolve(result)
          if(err) reject(err)
          else resolve(result)
    });
  })
}


const auth=function(user){
  return new Promise((resolve,reject)=>{
    const request=`SELECT * FROM user WHERE ?`;
    const values={email:user.email}
    console.log(user)
    db.query(request,values, (err,result) => {
          if (err) reject("Connexion erreur!");
          else {
            var password=user.password
            console.log(result)
            if(result[0])
            {
              bcrypt.compare(password, result[0].password, function(err, resultBcrypt) {
                  if (err) reject(err);
                  else {
                    if(resultBcrypt)
                    {

                      generateJWT(result)
                      .then((resp)=>{
                          resp="Bearer "+resp
                          console.log("jihao:",user);
                          user.online=1
                          user.access_token=resp
                          user.id=result[0].id
                          user.password=result[0].password
                          // updateInfo(user);
                          save(user)
                          .then((res)=>{
                            resolve({userId:user.id,token:resp});
                          })
                      })
                    }
                    else
                      reject("Mot de passe est incorrecte!")
                  }
               });
            }
            else {
              reject("Email n'existe pas!")
            }
          }
    });
  })
}

const generateJWT=function(user){
  return new Promise((resolve,reject)=>{
    console.log(user)
    const token=jwt.sign
    (
                      {
                        id:user.id,
                      	first_name:user.first_name,
                      	last_name:user.last_name,
                        sex:user.sex,
                      	email:user.email
                      },
                      'RANDOM_TOKEN_SECRET',
                      {expiresIn:"1h"}
    );
    resolve(token);
  })
}

const searchToken=function(token){
  return new Promise((resolve,reject)=>{
    console.log(token);
    const request="SELECT * FROM user WHERE reset_token = ? AND reset_at > NOW()";
    db.query(request,[token],(err,result)=>{
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("searchToken success:",result);
        resolve(result);
      }
    })
  })
}

const changePassword=function(list){
  return new Promise(function(resolve, reject) {
    const user={id:list.id};
    // const user={id:list.id,password:list.oldPassword}
    searchBy(user)
    .then((result)=>{
      console.log(result)
      if(result)
      {
        bcrypt.compare(list.oldPassword, result.password, function(err, result) {
          // resolve(result)
          if (result) {
            bcrypt.hash(list.newPassword,salt,function(err,hash) {
              user.password=hash;
              user.reset_token=null;
              user.reset_at=null;
              save(user)
              .then((res)=>{
                resolve("Le mot de passe a bien été changé")
              })
            })
          }else {
            reject("Le mot de passe est incorrecte")
          }
        });
      }else {
        reject("Le mot de passe est incorrecte")
      }
    });
  });
}
const setNewPassword=function(user){
  return new Promise(function(resolve,reject) {
    console.log("setNewPassword");
    console.log(user);
    const request= `UPDATE user SET ? WHERE id=${user.id}`;
    bcrypt.hash(user.password,salt,function(err,hash) {
      if(err)
        console.log(err);
      console.log("start hash");
      user.password=hash;
      user.reset_token=null;
      user.reset_at=null;
      save(user)
      .then((res)=>{

        resolve("Le mot de passe a bien été changé")
      })
    })
  })

}

module.exports={addUser,updateInfo,auth,searchBy,save,searchToken,changePassword,setNewPassword};
