const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1 Get all notes GET /api/notes/fetchallnotes. Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.json(notes);
  } catch (e) {
    res.status(500).send("Some error occured");
  }
});

//Route 2 add notes POST /api/notes/addnotes. Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const errors = validationResult(req);
      //if there are errors, return bad request and errors
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (e) {
      return res.status(500).send("Some error occured");
    }
  }
);



//Route 3 PUT update an existing note /api/notes/upatenote. Login required
router.put('/updatenote/:id',fetchUser,async (req,res)=>{
  const {title,description,tag} = req.body;
  
  //Create a newNote object
  const newNote = {}
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}


  //Find the note to be updated and update it
  let note=await Note.findById(req.params.id) // this id is the one which is passed in url
  if(!note){res.status(404).send("Not found")}

  if(note.user.toString()!==req.user.id){
    return res.status(401).send("Not Allowed!!")
  }

  note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
  //new:true means if any new contact comes then it gets created

  res.json({note});

})

module.exports = router;
