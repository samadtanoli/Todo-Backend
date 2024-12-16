const mongoose= require("mongoose")

const BookSchema= mongoose.Schema({
    title: {
        type:String,
        required: true,
        unique:true,
      },
      author:{
        type:String,
        required: true
      },
      description: {
        type:String,
        
      },
      noofpages:{
        type:Number,
    
      },
});

const BookModel= mongoose.model("books",BookSchema);

module.exports = BookModel