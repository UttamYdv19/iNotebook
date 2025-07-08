import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import NoteContext from "../context/notes/NoteContext";
export default function NoteItem({ note,updateNote,showAlert}) {
  const { title, description,_id } = note;
  const {deleteNote} = useContext(NoteContext)
  return (
    <div className="col-md-3" >
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <FaEdit className="mx-2" onClick={()=>updateNote(note)}/>
            <FaTrash className="mx-2" onClick={()=>{deleteNote(_id), showAlert("Note Deleted Succesfully","success")}}/>
          </div>
          <p className="card-text">{description} </p>
        </div>
      </div>
    </div>
  );
}
