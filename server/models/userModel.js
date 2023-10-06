import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    languages:[
        {
            languageName: {type: String, required: true},
            totalPoints: {type: Number, required: true},
            currentRating: {type: Number, required: true}
        }
    ]
},{
    timestamps: true
});


userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8);
    }
    next();
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',userSchema);

export default User;