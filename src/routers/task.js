const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const auth = require("../middleware/auth");
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
  // task
  //   .save()
  //   .then(() => {
  //     res.status(201).send(task);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e);
  //   });
});
//GET /tasks/completed=true
//GET /tasks/limit=10&skip=20
//GET /tasks/sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }
  try {
    //const tasks = await Task.find({ owner: req.user._id });
    //or you can use:
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit), //if limit is not provided it will be ignored by mongo
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();

    // if (!tasks) {
    //   return res.status(400).send();
    // }
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
  // Task.find({})
  //   .then(tasks => {
  //     res.send(tasks);
  //   })
  //   .catch(e => {
  //     res.status(500).send(e);
  //   });
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(400).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
  // Task.findById(_id)
  //   .then(task => {
  //     if (!task) {
  //       res.status(400).send();
  //     }
  //     res.send(task);
  //   })
  //   .catch(e => {
  //     res.status(500).send(e);
  //   });
});
router.patch("/tasks/:id", auth, async (req, res) => {
  const objectPropertiesFromBody = Object.keys(req.body);
  const allowedProperties = ["completed", "description"];
  const isValid = objectPropertiesFromBody.every(property =>
    allowedProperties.includes(property)
  );
  if (!isValid) {
    return res
      .status(400)
      .send({ error: "You can upldate only some of properties" });
  }
  try {
    const updatedTask = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    // const updatedTask = await Task.findById(req.params.id);
    objectPropertiesFromBody.forEach(
      property => (updatedTask[property] = req.body[property])
    );
    await updatedTask.save();
    // const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
    if (!updatedTask) {
      return res.status(404).send({ error: "The task doesnt exist" });
    }
    res.send(updatedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!deletedTask) {
      return res.status(404).send();
    }
    res.send(deletedTask);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
