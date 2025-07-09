const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../modules/Notes");
const { body, validationResult } = require("express-validator");


// ROUTE1 : Get all the Notes Using: GET "api/notes/fetchallnotes" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});


// ROUTE2 :  Add Note Using: POST "api/notes/addnotes" . Login required
router.post(
  "/addnotes",
  [
    body("title", "title atleast 2 character").notEmpty(),
    body("description", "description must be 5 character").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      const { title, description, tag } = req.body;
      const userId = req.user.id;
      const note = new Notes({
        title,
        description,
        tag,
        user: userId,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


// ROUTE3 :  Update a Note Using: PUT "api/notes/updatenotes" . Login required
router.put(
  "/updatenotes/:id",
  [
    body("title", "title atleast 2 character").notEmpty(),
    body("description", "description must be 5 character").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }

      let newNote = {};

      const { title, description, tag } = req.body;

      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("not found");
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Internal server error");
    }
  }
);


// ROUTE4 :  delete a Note Using: Delete "api/notes/deletenotes" . Login required
router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    let newNote = {};

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(
      req.params.id,
    );
    res.json("succes: note is deleted",{note:note});
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Internal server error");
  }
});


module.exports = router;
