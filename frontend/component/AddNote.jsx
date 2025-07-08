import React, { useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote({note,setNote,showAlert}) {
  const { addNote } = useContext(NoteContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Note Added Successfully", "success");
    setNote({ title: "", description: "" ,tag:"general"});
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center my-5">
    <div className="card shadow p-4 w-100" style={{ maxWidth: "600px" }}>
      <h3 className="text-center mb-4 text-primary">Add a New Note</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-semibold">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={note.title}
            minLength={2}
            required
            placeholder="Enter note title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
            placeholder="Enter note description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="tag" className="form-label fw-semibold">
            Tag
          </label>
          <select
            className="form-select"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          >
            <option value="general">General</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
          </select>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={note.title.length < 2 || note.description.length < 5}
          >
            Submit Note
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
}
