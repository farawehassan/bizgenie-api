const mongoose = require('mongoose'); 

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@farawecluster0-jbawq.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
console.log(uri);
const connectDB = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
    .then(() => { 
      console.log('DB connection successful!');
    })
    .catch(err => { 
      console.log(err);
      throw err;
    }); 
}; 

module.exports = connectDB;    