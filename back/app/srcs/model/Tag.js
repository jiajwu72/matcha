var db=require('./index.js')

const listTag=function(){
  return new Promise(function(resolve, reject) {
    const request=`SELECT * FROM tag`;
    db.query(request,(err,result)=>{
      if (err){
        console.log(err)
        resolve(null);
      }
      else resolve(result);
    })
  });
}

const addTag=function(tag){
  return new Promise(function(resolve, reject) {
    
  });
}

module.exports={listTag}
