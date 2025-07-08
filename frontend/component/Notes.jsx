import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import { useNavigate } from "react-router-dom";

export default function Notes({ showAlert }) {
  const { notes, getNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "general" });
  const modalRef = useRef(null);
  const closeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      navigate("/login");
    }
  }, []);

  const updateNote = (currentNote) => {
    modalRef.current.click();
    setNote(currentNote);
  };

  return (
    <div className="container my-5">
      {/* Add Note Section */}
      <AddNote note={note} setNote={setNote} showAlert={showAlert} />

      {/* Edit Note Modal */}
      <EditNote
        modalRef={modalRef}
        note={note}
        setNote={setNote}
        closeRef={closeRef}
        showAlert={showAlert}
      />

      {/* Notes List Heading */}
      <div className="border-bottom pb-2 mt-5 mb-4 d-flex justify-content-between align-items-center">
        <h4 className="fw-bold text-primary mb-0">Your Notes</h4>
        <span className="text-muted">{notes.length} total</span>
      </div>

      {/* Notes List */}
      <div className="row">
        {notes.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center py-4 rounded-3 shadow-sm">
              <h6 className="mb-0">No notes found. Add your first note!</h6>
            </div>
          </div>
        ) : (
          notes.map((note) => (
            <NoteItem
              note={note}
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
            />
          ))
        )}
      </div>
    </div>
  );
}
