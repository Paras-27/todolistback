import express from "express";
import Task from "../model/task.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body.newTask);
  const newTask = new Task({
    title: req.body.newTask,
  });

  try {
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const data = await Task.find().sort({ isCompleted: 1 });
  // console.log(data.title);
  res.status(200).json(data);
});

router.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  const { isCompleted } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { isCompleted },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const post = await Task.findById(taskId);
    await post.deleteOne();
    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const Title = req.body.title;
  try {
    const post = await Task.findByIdAndUpdate(
      taskId,
      { title: Title },
      { new: true }
    );
    // console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
