// //how to perform CRUD operations
// // const mongodb = require("mongodb");
// // const MongoClient = mongodb.MongoClient;
// // const ObjectID = mongodb.ObjectID;

// const { MongoClient, ObjectID } = require("mongodb");
// const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable to connect to database");
//     }
//     console.log("Connected correctly");

//     const db = client.db(databaseName); //store db in variable
//     db.collection("tasks")
//       .deleteOne({ description: "opis 2" })
//       .then(result => {
//         console.log(result);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     // db.collection("users")
//     //   .deleteMany({ age: 24 })
//     //   .then(result => {
//     //     console.log(result);
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //   });

//     // db.collection("tasks")
//     //   .updateMany(
//     //     {},
//     //     {
//     //       $set: {
//     //         completed: true
//     //       }
//     //     }
//     //   )
//     //   .then(result => {
//     //     console.log(result);
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //   });
//     // db.collection("users")
//     //   .updateOne(
//     //     { _id: new ObjectID("5e42acccdf947d1eb8c011c5") },
//     //     {
//     //       $inc: {
//     //         age: -2
//     //       }
//     //     }
//     //   )
//     //   .then(result => {
//     //     console.log(result);
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //   });
//     // db.collection("users")
//     //   .updateOne(
//     //     { _id: new ObjectID("5e42acccdf947d1eb8c011c5") },
//     //     {
//     //       $set: {
//     //         name: "Zoki update 2"
//     //       }
//     //     }
//     //   )
//     //   .then(result => {
//     //     console.log(result);
//     //   })
//     //   .catch(error => {
//     //     console.log(error);
//     //   });
//     // db.collection("tasks").findOne(
//     //   {
//     //     _id: new ObjectID("5e42b4e768632c2b9435e390")
//     //   },
//     //   (error, task) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(task);
//     //   }
//     // );
//     // db.collection("tasks")
//     //   .find({ completed: false })
//     //   .toArray((error, tasks) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(tasks);
//     //   });

//     // db.collection("users").findOne({ name: "Jen", age: 1 }, (error, user) => {
//     //   if (error) {
//     //     return console.log(error);
//     //   }
//     //   console.log(user);
//     // });
//     // db.collection("users")
//     //   .find({ age: 26 })
//     //   .toArray((error, users) => {
//     //     console.log(users);
//     //   });
//     // db.collection("users")
//     //   .find({ age: 26 })
//     //   .count((error, count) => {
//     //     console.log(count);
//     //   });
//     // // db.collection("users").insertOne(
//     //   {
//     //     name: "Zoki",
//     //     age: 26
//     //   },
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result.ops); // api documentation where is written, ops show the array which are inserted, there is insertedID etc...
//     //   }
//     // ); //how to access to collection then you can add, and checking if that was successefull
//     // db.collection("users").insertMany(
//     //   [
//     //     {
//     //       name: "Jen",
//     //       age: 28
//     //     },
//     //     {
//     //       name: "Ben",
//     //       age: 22
//     //     }
//     //   ],
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result.ops);
//     //   }
//     // );
//     // db.collection("tasks").insertMany(
//     //   [
//     //     {
//     //       description: "Opis1",
//     //       completed: true
//     //     },
//     //     {
//     //       description: "opis 2",
//     //       completed: false
//     //     },
//     //     {
//     //       description: "Opis 3",
//     //       completed: true
//     //     }
//     //   ],
//     //   (error, result) => {
//     //     if (error) {
//     //       return console.log(error);
//     //     }
//     //     console.log(result);
//     //   }
//     // );
//   }
// );
