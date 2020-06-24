var mongoose=require("./index").mongoose;
var UserSchema = new mongoose.Schema({
    username : { type:String,unique:true,required: true },
    password: { type: String,required: true },
    firstname : { type:String },
    lastname: { type: String},
    email: { type: String,unique:true,required: true },
    photoUrl:{type:String}
},{timestamps: true});

UserSchema.methods.generateJWT=function(){
	const jwt=require("jsonwebtoken");
	const token=jwt.sign(
                  {
                  	username:this.username,
                  	firstname:this.firstname,
                  	lastname:this.lastname,
                  	email:this.email
                  },
                  'RANDOM_TOKEN_SECRET',
                  {expiresIn:"1h"}
                  );
	return token;
}

UserSchema.methods.validatePassword=function(password){
	const bcrypt=require("bcrypt");
	var valid=false;
	return bcrypt.compareSync(password,this.password);
}

var UserModel = mongoose.model("users", UserSchema);
//console.log(UserModel)
module.exports = UserModel;

