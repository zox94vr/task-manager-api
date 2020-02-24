const express = require("express");
require("./db/mongoose"); //we dont want anything to declare in some variable just to make sure that the code in that file is runnig

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const app = express();
const port = process.env.PORT;
//configuring multer can be perfoming multiple times, depends what types of files you want to provide (pdf, word..)
const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a Word document"));
    }
    cb(undefined, true);
    //cb(new Error("File must be a PDF"));
    //cb(undefined, true);
    //cb(undefined, false);
  }
});
app.post(
  "/upload",
  upload.single("uploadName"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    //error function for express, way to handle error in express, not in multer
    res.status(400).send({ error: error.message });
  }
);
// app.use((req, res, next) => {
//   if (req.method == "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });
// app.use((req, res, next) => {
//   res.status(503).send("The server is under maintaining, please try later");
// });

app.use(express.json()); //automaticaly parse json from request body
app.use(userRouter);
app.use(taskRouter);
//without middleware: new request ->run route handler
//with middleware: new request->do something in middleware-> then run route handler

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
// const main = async () => {
//   // const task = await Task.findById("5e4ae2cc0cd10f33ec5b6a33");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);
//   const user = await User.findById("5e4ae1be97064333c8bf4a3d");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();
// const pet = {
//   name: "Hal"
// };
// pet.toJSON = function() {
//   console.log(this);
//   return this;
// };
// console.log(JSON.stringify(pet));
// const jwt = require("jsonwebtoken");
// const myFunction = async () => {
//   //generating jwt token
//   const token = jwt.sign({ _id: "abc" }, "thisismynewcourse", {
//     expiresIn: "7 days"
//   }); //create a jwt token, passed info you need for now only jwt id,second parameter is radnom which will provide sign of token
//   console.log(token);
//   const data = jwt.verify(token, "thisismynewcourse");
//   console.log(data);

//   //hashin password example
//   // const password = "Red12345!";
//   // const hashedPassword = await bcrypt.hash(password, 8); //fi
//   // console.log(password);
//   // console.log(hashedPassword);
//   // const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
//   // console.log(isMatch);
// };
// myFunction();
