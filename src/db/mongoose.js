const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// const newUSer = new User({
//   name: " IMEEE sa Passwordom    ",
//   email: "ZOX94VR@GMAIL.COM     ",
//   password: "123456789"
// });
// newUSer
//   .save()
//   .then(() => {
//     console.log(newUSer);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const newTask = new Task({
//   description: "Opis novog taska",
//   completed: true
// });
// newTask
//   .save()
//   .then(() => {
//     console.log(newTask);
//   })
//   .catch(error => {
//     console.log("ERROR!", error);
//   });
// const me = new User({
//   name: "Zoki",
//   age: "mike"
// });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log("Error!", error);
//   });
