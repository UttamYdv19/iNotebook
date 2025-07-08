import React, { useState } from "react";
import NoteContext from "./NoteContext";
export default function NoteState(props) {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Get All note
  const getNote = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const result = await response.json();
    setNotes(result);
  };

  // Add note
  const addNote = async (note) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(note),
    });
    const addedNote = await response.json();
    setNotes((notes) => [...notes, addedNote]);
  };

  // Edit note
  const editNote = async (data) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    let updatedData = await response.json();
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedData._id ? updatedData : note
      )
    );
  };

  // Delete note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const result = await response.json();
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
}
