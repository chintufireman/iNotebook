import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Fetch all notes
  const getNotes = async () => {
    //TODO API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      }
    });
    const json = await response.json();
    console.log(json);

    //Set notes
    setNotes(json)
  };



  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API CALL

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },

      body: JSON.stringify({title,description,tag}),
    });

    //Client side logic
    console.log("adding a new note");
    let note = {
      _id: "63d9829d1339147332fc7479",
      user: "63d8d30ebfc6497ec3f4555b",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-31T21:05:33.789Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
    //concat returns new array and push updates the array
  };
  //Delete a note
  const deleteNote = (id) => {
    //TODO API CALL
    console.log("Note Deleted" + id);
    let newNote = notes.filter((x) => {
      return x._id !== id;
    });
    setNotes(newNote);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },

      body: JSON.stringify({title,description,tag}),
    });

    const json = response.json();

    //Logic to edit in client
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getNotes }}
    >
      {props.children}
      {/* if you wont use props.children then where u are using NoteState it wont be able to display
        the components inside NoteState tag */}
    </NoteContext.Provider>
  );
};
/* anything u wrap between <NoteContext.provider> the value between this tag will automatically 
have all childrens of props */
export default NoteState;
