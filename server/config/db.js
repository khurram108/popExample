const mongoose = require('mongoose');


let path  = "mongodb+srv://popexample:123popexapmle@cluster0.dnbar.mongodb.net/popexample?retryWrites=true&w=majority"


mongoose.connect(path,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected");
})