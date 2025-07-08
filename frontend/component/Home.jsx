import React, { useContext } from "react";
import Notes from "./Notes";
export default function Home({showAlert}) {
  return (
    <>
      <h2 className="mt-5">Your Notes</h2>
      <div className="container">
      <Notes showAlert={showAlert}/>
      </div>
    </>
  );
}
