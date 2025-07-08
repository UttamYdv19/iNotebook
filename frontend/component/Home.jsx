import React, { useContext } from "react";
import Notes from "./Notes";
export default function Home({showAlert}) {
  return (
    <>
    <div className="bg-primary text-white py-3 mb-3 shadow-sm">
      <div className="container text-center">
        <h2 className="fw-bold mb-1">📓 iNotebook</h2>
        <p className="mb-0 small">Your secure and smart way to manage notes online</p>
      </div>
    </div>
  
    <div className="container">
      <Notes showAlert={showAlert} />
    </div>
  </>
    );
}
