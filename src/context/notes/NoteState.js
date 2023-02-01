import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63d96c9775438febb9228fdb",
      user: "63d8d30ebfc6497ec3f4555b",
      title: "Tomorrow updated3",
      description: "conquer earth updated3",
      tag: "personal updated",
      date: "2023-01-31T19:31:35.638Z",
      __v: 0,
    },
    {
      _id: "63d9829d1339147332fc7479",
      user: "63d8d30ebfc6497ec3f4555b",
      title: "Yesterday",
      description: "conquered earth",
      tag: "personal",
      date: "2023-01-31T21:05:33.789Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a note
  const addNote = (title,description,tag) => {
    //TODO API CALL
    console.log("adding a new note");
    let note= {
      _id: "63d9829d1339147332fc7479",
      user: "63d8d30ebfc6497ec3f4555b",
      title: title,
      description: description,
      tag: tag,
      date: "2023-01-31T21:05:33.789Z",
      __v: 0,
    }
    setNotes(notes.concat(note));
    //concat returns new array and push updates the array
  };
  //Delete a note
  const deleteNote = () => {};
  //Edit a note
  const editNote = () => {};

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote }}
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
