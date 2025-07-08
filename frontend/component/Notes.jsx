import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
export default function Notes() {
  const { notes, getNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    getNote();
  }, []);
  const updateNote = (currentNote) => {
    modalRef.current.click();
    setNote(currentNote);
  };
  return (
    <>
      <AddNote note={note} setNote={setNote} />
      <EditNote
        modalRef={modalRef}
        note={note}
        setNote={setNote}
        closeRef={closeRef}
      />
      <div className="row">
        {" "}
        {notes.length === 0 ? (
          <div className="alert alert-info text-center">
            No notes found. Add your first note!
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem note={note} key={note._id} updateNote={updateNote} />
          ))
        )}
      </div>
    </>
  );
}
