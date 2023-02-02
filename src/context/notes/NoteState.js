import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //FETCH ALL NOTES OR GET ALL NOTES -> GET
  const getNotes = async () => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },
    });
    const json = await response.json();
    //Set notes
    setNotes(json);
  };

  //ADD A NOTE => POST
  const addNote = async (title, description, tag) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    //concat returns new array and push updates the array
  };

  //DELETE A NOTE => DELETE
  const deleteNote = async (id) => {
    //TODO API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },
    });
    const json = response.json();
    console.log("Note Deleted" + id);
    let newNote = notes.filter((x) => {
      return x._id !== id;
    });
    setNotes(newNote);
  };

  //EDIT A NOTE => PUT
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOGQzMGViZmM2NDk3ZWMzZjQ1NTViIn0sImlhdCI6MTY3NTE5MzEwN30.REd40HKou_SvZSMwi2kokZ1W4fyibbJL5YorULwpAl4",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    //console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes)); //because in react u cannot directly change state
    //Logic to edit in client
    for (let i = 0; i < newNotes.length; i++) {
      let element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
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
