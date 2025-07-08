import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem({ note, updateNote, showAlert }) {
  const { title, description, tag, _id } = note;
  const { deleteNote } = useContext(NoteContext);

  const handleDelete = () => {
    deleteNote(_id);
    showAlert("Note deleted successfully", "success");
  };

  return (
    <div className="col-md-4 col-sm-6 col-12 mb-4">
      <div
        className="card shadow-sm h-100 border-0"
        style={{
          backgroundColor: "#f8f9fa", // soft light gray
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="fw-semibold text-dark mb-0">{title}</h5>
          <div>
            <FaEdit
              className="text-primary me-2"
              style={{ cursor: "pointer" }}
              title="Edit"
              onClick={() => updateNote(note)}
            />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              title="Delete"
              onClick={handleDelete}
            />
          </div>
        </div>
        <p className="text-secondary mb-2" style={{ fontSize: "0.95rem" }}>
          {description}
        </p>
        <span className="badge bg-secondary text-capitalize">{tag}</span>
      </div>
    </div>
  );
}
