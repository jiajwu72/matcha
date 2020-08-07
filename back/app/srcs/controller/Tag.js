
const TagModel=require('../model/Tag');

class TagController {

  listTag(req,res){
    // const tag=req.params
    // console.log(req.params);
    TagModel.listTag()
    .then((result)=>{
      console.log(result);
    })
    .catch((e)=>{
      console.log(e);
    })
    // TagModel.searchBy(tag)
    // .then((result)=>{
    //   console.log(result)
    //   if(result){
    //     res.send({res:result})
    //   }
    //   else {
    //     res.send({error:"tagId n'est pas correcte"})
    //   }
    // })
    // .catch((e)=>{
    //   // console.log(err)
    //   res.send({error:e})
    // })
  }

}

module.exports=new TagController()
