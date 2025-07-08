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
    <div className="container my-4">
      <h2>Add a Note</h2>
      <form className="my-m" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
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
        <button disabled={note.title.length<2 || note.description.length <5} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
